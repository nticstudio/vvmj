<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210928072729 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE etablissement (id INT AUTO_INCREMENT NOT NULL, gh_id INT NOT NULL, code VARCHAR(255) NOT NULL, libelle VARCHAR(255) NOT NULL, status TINYINT(1) NOT NULL, INDEX IDX_20FD592C8AA29F8E (gh_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groupement (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, libelle VARCHAR(255) NOT NULL, status TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inscription (id INT AUTO_INCREMENT NOT NULL, visite_id INT NOT NULL, uf_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, INDEX IDX_5E90F6D6C1C5DC59 (visite_id), INDEX IDX_5E90F6D6705D2C5F (uf_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE metier (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, libelle VARCHAR(255) NOT NULL, status TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE unite (id INT AUTO_INCREMENT NOT NULL, eg_id INT NOT NULL, code VARCHAR(255) NOT NULL, libelle VARCHAR(255) NOT NULL, status TINYINT(1) NOT NULL, INDEX IDX_1D64C118A801DCB8 (eg_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE visite (id INT AUTO_INCREMENT NOT NULL, uf_id INT NOT NULL, created_by_id INT DEFAULT NULL, chaperon_id INT DEFAULT NULL, presentation LONGTEXT NOT NULL, date DATE NOT NULL, hdebut TIME NOT NULL, hfin TIME NOT NULL, consigne LONGTEXT DEFAULT NULL, places SMALLINT NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_B09C8CBB705D2C5F (uf_id), INDEX IDX_B09C8CBBB03A8386 (created_by_id), INDEX IDX_B09C8CBB4136B220 (chaperon_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE etablissement ADD CONSTRAINT FK_20FD592C8AA29F8E FOREIGN KEY (gh_id) REFERENCES groupement (id)');
        $this->addSql('ALTER TABLE inscription ADD CONSTRAINT FK_5E90F6D6C1C5DC59 FOREIGN KEY (visite_id) REFERENCES visite (id)');
        $this->addSql('ALTER TABLE inscription ADD CONSTRAINT FK_5E90F6D6705D2C5F FOREIGN KEY (uf_id) REFERENCES unite (id)');
        $this->addSql('ALTER TABLE unite ADD CONSTRAINT FK_1D64C118A801DCB8 FOREIGN KEY (eg_id) REFERENCES etablissement (id)');
        $this->addSql('ALTER TABLE visite ADD CONSTRAINT FK_B09C8CBB705D2C5F FOREIGN KEY (uf_id) REFERENCES unite (id)');
        $this->addSql('ALTER TABLE visite ADD CONSTRAINT FK_B09C8CBBB03A8386 FOREIGN KEY (created_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE visite ADD CONSTRAINT FK_B09C8CBB4136B220 FOREIGN KEY (chaperon_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE unite DROP FOREIGN KEY FK_1D64C118A801DCB8');
        $this->addSql('ALTER TABLE etablissement DROP FOREIGN KEY FK_20FD592C8AA29F8E');
        $this->addSql('ALTER TABLE inscription DROP FOREIGN KEY FK_5E90F6D6705D2C5F');
        $this->addSql('ALTER TABLE visite DROP FOREIGN KEY FK_B09C8CBB705D2C5F');
        $this->addSql('ALTER TABLE inscription DROP FOREIGN KEY FK_5E90F6D6C1C5DC59');
        $this->addSql('DROP TABLE etablissement');
        $this->addSql('DROP TABLE groupement');
        $this->addSql('DROP TABLE inscription');
        $this->addSql('DROP TABLE metier');
        $this->addSql('DROP TABLE unite');
        $this->addSql('DROP TABLE visite');
    }
}
