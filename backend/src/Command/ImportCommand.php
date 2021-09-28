<?php

namespace App\Command;

use App\Entity\Etablissement;
use App\Entity\Groupement;
use App\Entity\Metier;
use App\Entity\Unite;
use App\Repository\EtablissementRepository;
use App\Repository\GroupementRepository;
use App\Repository\UniteRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Finder\Finder;
use Doctrine\ORM\EntityManagerInterface;

class ImportCommand extends Command
{
    protected static $defaultName = 'app:import';
    protected static $defaultDescription = 'Import Command';

    private $finder_in = 'resources';
    private $entityManager;
    private $groupements;
    private $etablissements;
    private $unites;

    private $default_filenames = array(
        'gh' => 'stethos_er.csv',
        'eg' => 'stethos_eg.csv',
        'uf' => 'stethos_uf.csv',
        'metier' => 'hraccess_metiers.csv',
    );


    public function __construct(EntityManagerInterface $em, GroupementRepository $groupements, EtablissementRepository $etablissements, UniteRepository $unites)
    {
        parent::__construct();

        $this->entityManager = $em;
        $this->groupements = $groupements;
        $this->etablissements = $etablissements;
        $this->unites = $unites;
    }

    protected function configure(): void
    {
        $this
            ->addOption('gh', null, InputOption::VALUE_NONE, 'Import des groupements')
            ->addOption('eg', null, InputOption::VALUE_NONE, 'Import des etablissements')
            ->addOption('uf', null, InputOption::VALUE_NONE, 'Import des unites')
            ->addOption('metier', null, InputOption::VALUE_NONE, 'Import des metiers')
            ->addOption('all', null, InputOption::VALUE_NONE, 'Import des fichiers');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ($input->getOption('gh') || $input->getOption('all')) {
            $io->note('Import des groupements');
            $this->gh();
        }

        if ($input->getOption('eg')  || $input->getOption('all')) {
            $io->note('Import des etablissements');
            $this->eg();
        }

        if ($input->getOption('uf')  || $input->getOption('all')) {
            $io->note('Import des unites fonctionnelles');
            $this->uf();
        }

        if ($input->getOption('metier')  || $input->getOption('all')) {
            $io->note('Import des metiers');
            $this->metier();
        }

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    /**
     * Parse a csv file
     * 
     * @return array
     */
    private function parseCSV(string $filename,  $ignoreFirstLine)
    {

        $finder = new Finder();
        $finder->files()
            ->in($this->finder_in)
            ->name($filename);
        foreach ($finder as $file) {
            $csv = $file;
        }

        $rows = array();
        if (($handle = fopen($csv->getRealPath(), "r")) !== FALSE) {
            $i = 0;
            while (($data = fgetcsv($handle, null, ";")) !== FALSE) {
                $i++;
                if ($ignoreFirstLine && $i == 1) {
                    continue;
                }
                $rows[] = $data;
            }
            fclose($handle);
        }

        return $rows;
    }

    /**
     * Import des groupements à partir d'un fichier CSV
     * @param string|null @filename  Nom du fichier à importer
     */
    private function gh(string $filename = null)
    {

        if (!$filename)
            $filename = $this->default_filenames['gh'];

        $rows = $this->parseCSV($filename, true);
        foreach ($rows as $row) {
            $gh = new Groupement($row[0], $row[2], 1);
            $this->entityManager->persist($gh);
            $this->entityManager->flush();
        }
    }

    /**
     * Import des etablissement à partir d'un fichier CSV
     * @param string|null @filename  Nom du fichier à importer
     */
    private function eg(string $filename = null)
    {

        if (!$filename)
            $filename = $this->default_filenames['eg'];

        $rows = $this->parseCSV($filename, true);




        foreach ($rows as $row) {
            $eg = new Etablissement($row[0], $row[2], 1);
            $eg->setGh($this->groupements->findOneBy(['code' => $row[9]]));
            $this->entityManager->persist($eg);
            $this->entityManager->flush();
        }
    }


    /**
     * Import des unites fonctionnelles à partir d'un fichier CSV
     * @param string|null @filename  Nom du fichier à importer
     */
    private function uf(string $filename = null)
    {

        if (!$filename)
            $filename = $this->default_filenames['uf'];

        $rows = $this->parseCSV($filename, true);

        foreach ($rows as $row) {
            $uf = new Unite($row[0], $row[2], 1);
            $uf->setEg($this->etablissements->findOneBy(['code' => $row[10]]));
            $this->entityManager->persist($uf);
            $this->entityManager->flush();
        }
    }


        /**
     * Import des metiers à partir d'un fichier CSV
     * @param string|null @filename  Nom du fichier à importer
     */
    private function metier(string $filename = null)
    {

        if (!$filename)
            $filename = $this->default_filenames['metier'];

        $rows = $this->parseCSV($filename, true);

        foreach ($rows as $row) {
            $metier = new Metier($row[0], $row[1], 1);         
            $this->entityManager->persist($metier);
            $this->entityManager->flush();
        }
    }
}
