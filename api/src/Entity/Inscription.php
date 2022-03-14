<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\InscriptionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *    normalizationContext= { "groups": {"read:inscriptions"}},
  *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:inscriptions","read:inscription"}}
 *           }
 *    }
 * )
 * @ORM\Entity(repositoryClass=InscriptionRepository::class)
 */
class Inscription
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $phone;

    /**
     * @ORM\ManyToOne(targetEntity=Visite::class, inversedBy="inscriptions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $visite;

    /**
     * @ORM\ManyToOne(targetEntity=Unite::class, inversedBy="inscriptions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $uf;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read:inscriptions","read:visite"}) 
     */
    private $cancel_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVisite(): ?visite
    {
        return $this->visite;
    }

    public function setVisite(?visite $visite): self
    {
        $this->visite = $visite;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getUf(): ?unite
    {
        return $this->uf;
    }

    public function setUf(?unite $uf): self
    {
        $this->uf = $uf;

        return $this;
    }

    public function getCancelDate(): ?\DateTimeInterface
    {
        return $this->cancel_date;
    }

    public function setCancelDate(?\DateTimeInterface $cancel_date): self
    {
        $this->cancel_date = $cancel_date;

        return $this;
    }

    public function isActive() {
        return $this->cancel_date == null;
    }
}
