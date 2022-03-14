<?php

namespace App\Repository;

use App\Entity\Groupement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Groupement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Groupement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Groupement[]    findAll()
 * @method Groupement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Groupement::class);
    }

    // /**
    //  * @return Groupement[] Returns an array of Groupement objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Groupement
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
