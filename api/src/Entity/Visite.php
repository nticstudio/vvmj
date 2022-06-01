<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VisiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Etablissement;
/**
 * @ApiResource(
 *    normalizationContext= { "groups": {"read:visites"}},
  *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:visites","read:visite"}}
 *           }
 *    }
 * )
 * @ORM\Entity(repositoryClass=VisiteRepository::class)
 * @ApiFilter(
 *    SearchFilter::class, properties = {"id":"exact","uf.code":"exact", "uf.eg.code":"exact", "uf.eg.gh.code":"exact", "metier.code":"exact"}
 * )
 */
class Visite
{

    use SoftDeleteableEntity;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:visites"}) 
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Unite::class, inversedBy="visites")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:visites"}) 
     */
    private $uf;

     /**
     * @ORM\Column(type="text")
     * @Groups({"read:visite"}) 
     */
    private $presentation;

    /**
     * @ORM\Column(type="date")
     * @Groups({"read:visites"}) 
     * @Groups({"read:visite"}) 
     */
    private $date;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:visite"}) 
     */
    private $hdebut;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:visite"}) 
     */
    private $hfin;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="visites")
     * @Groups({"read:visite"}) 
     */
    private $created_by;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="visitesChaperon")
     * @Groups({"read:visite"}) 
     */
    private $chaperon;

    /**
     * @ORM\OneToMany(targetEntity=Inscription::class, mappedBy="visite")
     * @Groups({"read:visite"}) 
     */
    private $inscriptions;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:visite"}) 
     */
    private $consigne;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"read:visites"}) 
     */
    private $places;

     /**
     * @Groups({"read:visites"}) 
     */
    private $eg;

     /**
     * @Groups({"read:visites"}) 
     */
    private $gh;

     /**
     * @Groups({"read:visites"}) 
     */
    private $nb_inscription;

    /**
     * @ORM\ManyToOne(targetEntity=Metier::class, inversedBy="visites")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"read:visites"}) 
     */
    private $metier;

    public function __construct()
    {
        $this->inscriptions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPresentation(): ?string
    {
        return $this->presentation;
    }

    public function setPresentation(string $presentation): self
    {
        $this->presentation = $presentation;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHdebut(): ?\DateTimeInterface
    {
        return $this->hdebut;
    }

    public function setHdebut(\DateTimeInterface $hdebut): self
    {
        $this->hdebut = $hdebut;

        return $this;
    }

    public function getHfin(): ?\DateTimeInterface
    {
        return $this->hfin;
    }

    public function setHfin(\DateTimeInterface $hfin): self
    {
        $this->hfin = $hfin;

        return $this;
    }

    public function getCreatedBy(): ?user
    {
        return $this->created_by;
    }

    public function setCreatedBy(?user $created_by): self
    {
        $this->created_by = $created_by;

        return $this;
    }

    public function getChaperon(): ?user
    {
        return $this->chaperon;
    }

    public function setChaperon(?user $chaperon): self
    {
        $this->chaperon = $chaperon;

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
            $inscription->setVisite($this);
        }

        return $this;
    }

    public function removeInscription(Inscription $inscription): self
    {
        if ($this->inscriptions->removeElement($inscription)) {
            // set the owning side to null (unless already changed)
            if ($inscription->getVisite() === $this) {
                $inscription->setVisite(null);
            }
        }

        return $this;
    }

    public function getConsigne(): ?string
    {
        return $this->consigne;
    }

    public function setConsigne(?string $consigne): self
    {
        $this->consigne = $consigne;

        return $this;
    }

    public function getPlaces(): ?int
    {
        return $this->places;
    }

    public function setPlaces(int $places): self
    {
        $this->places = $places;

        return $this;
    }

    public function getEg(): ?Etablissement
    {
        if($this->uf) {
            return $this->uf->getEg();
        }

        return null;

    }

    public function getGh(): ?Groupement
    {
        if($this->uf) {
            return $this->uf->getEg()->getGh();
        }

        return null;

    }

    public function getMetier(): ?metier
    {
        return $this->metier;
    }

    public function setMetier(?metier $metier): self
    {
        $this->metier = $metier;

        return $this;
    }

    public function  getNbInscription(): int {
       
        return $this->inscriptions->filter(function($p) {
              return $p->isActive();
        })->count();
    }

  
}
