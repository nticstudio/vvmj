<?php

namespace App\Security;

use App\Exception\CustomBadRequestException;
use App\Exception\CustomUnsupportedMediaTypeException;
use App\Repository\UserRepository;
use App\Service\ActiveDirectory;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\MissingTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class CustomLdapAuthenticator  extends AbstractAuthenticator implements AuthenticationEntryPointInterface
{

    private $activeDirectory;
    private  $encoder;
        private  $userRepository;
        private  $entityManager;
        private  $ldapEntry;

    public function __construct(
        ActiveDirectory $activeDirectory,
        JWTEncoderInterface $encoder,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager
     ) {
    
    $this->activeDirectory  = $activeDirectory;
    $this->encoder = $encoder;
    $this->userRepository = $userRepository;
    $this->entityManager = $entityManager;
  }
    
     /** CHECK IF WE'VE TO AUTHENTICATE THE USER */
     public function supports(Request $request): ?bool
     {
        // On rentre dans ce authenticator si on utilsie l'api_login
         return 'api_login' === $request->attributes->get('_route') && $request->isMethod(Request::METHOD_POST);
     }
     public function authenticate(Request $request): SelfValidatingPassport
     {
         // If header isn't json
         if ('json' != $request->getContentType() || null == $request->getContentType()) {
             throw new CustomUnsupportedMediaTypeException('WRONG CONTENT-TYPE');
         }
         /* CSRF TOKEN IS DISABLED BECAUSE WE'RE WORKING WITH A STATELESS API */
         // RETRIEVES DATA FROM REQUEST
         $body = json_decode($request->getContent());
         
         if (!isset($body->password) || !isset($body->username) || null == $body->username || null == $body->password) {
             throw new CustomBadRequestException('ERROR IN REQUEST');
         }
         $loginFromRequest = $body->username;
         $passwordFromRequest = $body->password;
         
         // Authentification de l'utilisateur
         $ldapEntry = $this->activeDirectory->getEntryFromActiveDirectory($loginFromRequest, $passwordFromRequest);

         // On quitte si la ressource est introuvable
         if (null == $ldapEntry) {
            
             throw new UserNotFoundException('Ressource AD introuvable');
         } else {
             $this->ldapEntry = $ldapEntry;            
         }
         // IF EVERYTHING DID WELL THEN RETURN THE PASSPORT (SELF VALIDATED BECAUSE WE'VE ALREADY CHECKED THE USER)
         return new SelfValidatingPassport(new UserBadge($loginFromRequest));
     }
     public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
     {
         try {           
             // GERATION DU JWT TOKEN
             // Recherche de l'utilsiateur dans la bdd
             $user = $this->userRepository->findOneBy(['email' => $this->ldapEntry->getAttribute('mail')[0]]);
             if (null !== $user) {
                 $roles = $user->getRoles();
             } else {
                 $roles = null;
             }
        
             // refus de l'aces si l'utilsiateur nest introuvable
             if(!$user)
                throw new UserNotFoundException('User not registered.');

             $jwtToken = $this->encoder->encode([
                 'email'=> $this->ldapEntry->getAttribute('mail')[0], 
                 'cn'=> $this->ldapEntry->getAttribute('cn')[0], 
                 'telephoneNumber'=> $this->ldapEntry->getAttribute('telephoneNumber')[0], 
                 'uf'=> $this->ldapEntry->getAttribute('division')[0], 
                 'roles' => $roles, 
                 'id' => $user->getId(), 
                 'exp' => time() + 1300]);

         } catch (JWTEncodeFailureException $JWTEncodeFailureException) {
             return new JsonResponse(['message' => $JWTEncodeFailureException->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
         } catch (Exception $e) {
             return new JsonResponse(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
         }
     return new JsonResponse(['token' => $jwtToken], Response::HTTP_CREATED);
     }
     public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
     {
         /* DYNAMICALLY GENERATES THE CODE RESPONSE */
         if ($exception instanceof CustomUnsupportedMediaTypeException) {
             $codeResponse = Response::HTTP_UNSUPPORTED_MEDIA_TYPE;
         } elseif ($exception instanceof CustomBadRequestException) {
             $codeResponse = Response::HTTP_BAD_REQUEST;
         } elseif ($exception instanceof UserNotFoundException) {
             $codeResponse = Response::HTTP_NOT_FOUND;
         } else {
             $codeResponse = Response::HTTP_UNAUTHORIZED;
         }
         $data = [
             'message' => strtr($exception->getMessageKey(), $exception->getMessageData()),           
         ];
         return new JsonResponse($data, $codeResponse);
     }
     /** SEND A CLEAR ERROR AND HOW TO CORRECTLY LOGIN TO THE API */
     public function start(Request $request, AuthenticationException $authException = null): ?Response
     {
         $exception = new MissingTokenException('JWT Token not found', 0, $authException);
         $event = new JWTNotFoundEvent($exception, new JWTAuthenticationFailureResponse($exception->getMessageKey()));
         return $event->getResponse();
     }
    
   
}
