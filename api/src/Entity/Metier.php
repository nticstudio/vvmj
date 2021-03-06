<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MetierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
/**
 * @ApiResource(
 *    normalizationContext= { "groups": {"read:metiers"}}
 * )
 * @ORM\Entity(repositoryClass=MetierRepository::class)
 * @ApiFilter(
 *    SearchFilter::class, properties = {"id":"exact","code":"partial", "libelle": "partial"}
 * )
 * @ApiFilter( BooleanFilter::class, properties = { "status" })
 */
class Metier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:metiers","read:visites"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:metiers","read:visites"}) 
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:metiers","read:visites"}) 
     */
    private $libelle;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Visite::class, mappedBy="metier")
     */
    private $visites;


    public function __construct(string $code = null, string $libelle = null)
    {
        
        if($code) {            
            $this->setCode($code);
        }

        if($libelle) {
            $this->setLibelle($libelle);
        }

        $this->status = true;
        $this->visites = new ArrayCollection();
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
            $visite->setMetier($this);
        }

        return $this;
    }

    public function removeVisite(Visite $visite): self
    {
        if ($this->visites->removeElement($visite)) {
            // set the owning side to null (unless already changed)
            if ($visite->getMetier() === $this) {
                $visite->setMetier(null);
            }
        }

        return $this;
    }
}
