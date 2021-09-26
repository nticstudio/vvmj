<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;


class MeController extends AbstractController
{

    private $security;


    public function __construct(Security $security)
    {
        $this->security = $security;
        
    }
   
     /**
     * @Route("/api/me", name="api_user_me")
     *     
     */
    public function __invoke()
    {
        $user = $this->security->getUser();
        return $this->json($user);
        
    }
    
}
