<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Unite;
use App\Entity\Visite;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;


class VisitesFixtures extends Fixture
{

   

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $user =  $manager->find(User::class,1);


       // $user =  $manager->getRepository(UserRepository::class)->find(1);

       
        for ($i = 0; $i < 5; $i++) {
            $visite = new Visite();
            $visite->setPresentation($faker->paragraph());
            $uf = $manager->find(Unite::class,$faker->numberBetween(1, 4000));

            $visite->setuf($uf);

            $visite->setDate($faker->dateTimeInInterval('now','+ 60 days'));
            $visite->setHdebut(new \DateTime($faker->time('H:i')));
            $visite->setHfin(new \DateTime($faker->time('H:i','+8 hours')));
            $visite->setPlaces($faker->numberBetween(1, 5) );
            $visite->setConsigne($faker->sentence(10));
            $visite->setCreatedBy($user);
            $visite->setChaperon($user);
            $manager->persist($visite);
         }

        $manager->flush();
    }
}
