<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UniteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;

/**
 * @ORM\Entity(repositoryClass=UniteRepository::class)
 * @ApiResource(
 *    normalizationContext= { "groups": {"read:unites"}},
  *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:users"}}
 *           }
 *    }
 * )
 * @ApiFilter(
 *    SearchFilter::class, properties = {"id":"exact","code":"partial", "libelle": "partial", "eg.code":"exact"}
 * )
 * @ApiFilter( BooleanFilter::class, properties = { "status" })
 */
class Unite
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:unites","read:visites"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:unites","read:visites"}) 
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:unites","read:visites"}) 
     */
    private $libelle;

    /**
     * @ORM\ManyToOne(targetEntity=Etablissement::class, inversedBy="unites")
     * @ORM\JoinColumn(nullable=false)   
     */
    private $eg;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Visite::class, mappedBy="uf")
     */
    private $visites;

    /**
     * @ORM\OneToMany(targetEntity=Inscription::class, mappedBy="uf")
     */
    private $inscriptions;

    public function __construct(string $code = null, string $libelle = null)
    {
        $this->visites = new ArrayCollection();
        $this->inscriptions = new ArrayCollection();

        if($code) {            
            $this->setCode($code);
        }

        if($libelle) {
            $this->setLibelle($libelle);
        }

        $this->status = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getEg(): ?etablissement
    {
        return $this->eg;
    }

    public function setEg(?etablissement $eg): self
    {
        $this->eg = $eg;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Visite[]
     */
    public function getVisites(): Collection
    {
        return $this->visites;
    }

    public function addVisite(Visite $visite): self
    {
        if (!$this->visites->contains($visite)) {
            $this->visites[] = $visite;
            $visite->setUf($this);
        }

        return $this;
    }

    public function removeVisite(Visite $visite): self
    {
        if ($this->visites->removeElement($visite)) {
            // set the owning side to null (unless already changed)
            if ($visite->getUf() === $this) {
                $visite->setUf(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Inscription[]
     */
    public function getInscriptions(): Collection
    {
        return $this->inscriptions;
    }

    public function addInscription(Inscription $inscription): self
    {
        if (!$this->inscriptions->contains($inscription)) {
            $this->inscriptions[] = $inscription;
            $inscription->setUf($this);
        }

        return $this;
    }

    public function removeInscription(Inscription $inscription): self
    {
        if ($this->inscriptions->removeElement($inscription)) {
            // set the owning side to null (unless already changed)
            if ($inscription->getUf() === $this) {
                $inscription->setUf(null);
            }
        }

        return $this;
    }
}
