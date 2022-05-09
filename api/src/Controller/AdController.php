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
     * @Route("/api/ad/search/{search}", name="api_user_ad_search")
     *     
     */
    public function __invoke(string $search)
    {
        //  $ldap_entry = $this->activeDirectory->searchFromActiveDirectory('bernard.dubois@chu-lyon.fr');

     
        // $ldap_entry = $this->activeDirectory->searchFromActiveDirectoryByName($search);
         $ldap_entry = $this->activeDirectory->searchFromActiveDirectory($search);
        return $this->json(array($ldap_entry) );
        
    }
    
}
