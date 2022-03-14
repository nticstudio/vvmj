<?php

namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\ContextAwareDenormalizerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;

class UserOwnedDenormalizer implements ContextAwareDenormalizerInterface, DenormalizerAwareInterface
{

    use DenormalizerAwareTrait;

    private const ALREADY_DENORMALIZER = 'UserOwnedDenormalizerCalled';


    private $security;

    public function __construct(Security $security)
    {
        $this->security =  $security;
    }
   
   

    public function supportsDenormalization($data,  $type,  $format = null, array $context = []) {


            $alreadycalled = $context[self::ALREADY_DENORMALIZER] ?? false;
           // $types = Patient::class === $type  || Consult::class === $type;
          
            // return $types && $alreadycalled === false;
        //}

        return  $alreadycalled;

    }

    public function denormalize($data,  $type,  $format = null, array $context = []) {
       
        $context[self::ALREADY_DENORMALIZER] = true;
        

        //  if (Patient::class === $type  || Consult::class === $type  ) {
        
        
        $obj = $this->denormalizer->denormalize($data,  $type,  $format, $context);

        //$obj_id = $obj->getCreatedBy()->getId();

        //    if($obj_id )
        
       // $obj->setCreatedBy($this->security->getUser());       
        ///*dd($obj);
        return $obj;
    }


}
