<?php

namespace App\Controller;

use App\Service\ActiveDirectory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\JsonResponse;


class AdController extends AbstractController
{

   
    private $activeDirectory;


    public function __construct(ActiveDirectory $activeDirectory)
    {
        $this->activeDirectory = $activeDirectory;
        
    }
   
     /**
     * @Route("/api/ad/search", name="api_user_ad_search")
     *     
     */
    public function __invoke()
    {
         $ldap_entry = $this->activeDirectory->searchFromActiveDirectory('bernard.dubois@chu-lyon.fr');
        return $this->json($ldap_entry );
        
    }
    
}
