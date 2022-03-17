<?php
namespace App\Service;
use Symfony\Component\Ldap\Adapter\ExtLdap\Adapter;
use Symfony\Component\Ldap\Entry;
use Symfony\Component\Ldap\Exception\ConnectionException;
use Symfony\Component\Ldap\Ldap;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class ActiveDirectory
{

    private $ldapAdapter;
    private  $ldapServiceDn;
    private $ldap;

    public function __construct(
        Adapter $ldapAdapter,
        string $ldapServiceDn,
        string $ldapServiceUser,
        string $ldapServicePassword,
        Ldap $ldap
    ) {
        $this->ldapAdapter = $ldapAdapter;
        $this->ldap = new Ldap($this->ldapAdapter);
        $this->ldapServiceDn = $ldapServiceDn;
        $this->ldapServiceUser =  $ldapServiceUser;
         // $this->ldap->bind(implode(',', ['uid='.$ldapServiceUser, $ldapServiceDn]), $ldapServicePassword);

         $this->ldap->bind($ldapServiceUser, $ldapServicePassword);
       // $this->ldap->bind('CN=Gerald CIRENE,OU=DSII,OU=Utilisateurs,DC=chu-lyon,DC=fr', 'Fevrier2022');
    }
    // get an Active Directory user entry via LDAP using user-submitted credentials (used to authenticate the user)
    public function getEntryFromActiveDirectory(string $username, string $password): ?Entry
    {
        $ldap = new Ldap($this->ldapAdapter);
        $search = array();
        $value = null;
        try {
        
            if ($this->ldapAdapter->getConnection()->isBound()) {
                $search = $this->ldap->query(
                    'DC=chu-lyon,DC=fr',
                    '(&(objectClass=Person)(| (sAMAccountName='.$username.')))'
                )->execute()->toArray();
                

               // $dn = 
            }
        } catch (ConnectionException $e) {
            return null;
        }
       
        if ($search && 1 === count($search)) {
            $value = $search[0];

            // Vérification du  mot de passe
            $dn =  $value ->getDn();
         
            try {
            $ldap->bind($dn,$password);
            }
            catch (ConnectionException $e) {
                throw new BadCredentialsException('The presented password is invalid.');
            }
        }




        return $value;
    }


    // get an Active Directory user entry via LDAP using user-submitted credentials (used to authenticate the user)
    public function searchFromActiveDirectory(string $email): ?Entry
    {
      //  $ldap = new Ldap($this->ldapAdapter);
        $search = array();
        $value = null;
        try {
        
            if ($this->ldapAdapter->getConnection()->isBound()) {
                $search = $this->ldap->query(
                    'DC=chu-lyon,DC=fr',
                    '(&(objectClass=Person)(| (mail='.$email.')))'
                )->execute()->toArray();
                

               // $dn = 
            }
        } catch (ConnectionException $e) {
            return null;
        }
       
        if ($search && 1 === count($search)) {
            $value = $search[0];
           
        }

        return $value;
    }
}