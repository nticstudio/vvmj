<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VisiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=VisiteRepository::class)
 */
class Visite
{

    use SoftDeleteableEntity;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=unite::class, inversedBy="visites")
     * @ORM\JoinColumn(nullable=false)
     */
    private $uf;

    /**
     * @ORM\Column(type="text")
     */
    private $presentation;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="time")
     */
    private $hdebut;

    /**
     * @ORM\Column(type="time")
     */
    private $hfin;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="visites")
     */
    private $created_by;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="visitesChaperon")
     */
    private $chaperon;

    /**
     * @ORM\OneToMany(targetEntity=Inscription::class, mappedBy="visite")
     */
    private $inscriptions;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $consigne;

    /**
     * @ORM\Column(type="smallint")
     */
    private $places;

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
}
