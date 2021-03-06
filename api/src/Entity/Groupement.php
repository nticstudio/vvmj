<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GroupementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;

/**
 * @ApiResource(
 *    normalizationContext= { "groups": {"read:groupements"}},
 *    itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:groupements"}}
 *           }
 *    }
 * )
 * @ORM\Entity(repositoryClass=GroupementRepository::class)
 * 
 * @ApiFilter( SearchFilter::class, properties = {"id":"exact","code":"partial", "libelle": "partial"})
 * @ApiFilter( BooleanFilter::class, properties = { "status" })
 */
class Groupement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:groupements"}) 
     * @Groups({"read:visites"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:groupements"}) 
     * @Groups({"read:visites"}) 
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:groupements"}) 
     * @Groups({"read:visites"}) 
     */
    private $libelle;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Etablissement::class, mappedBy="gh")
     */
    private $etablissements;

    public function __construct(string $code = null, string $libelle = null)
    {
        $this->etablissements = new ArrayCollection();
        if ($code) {
            $this->setCode($code);
        }

        if ($libelle) {
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
     * @return Collection|Etablissement[]
     */
    public function getEtablissements(): Collection
    {
        return $this->etablissements;
    }

    public function addEtablissement(Etablissement $etablissement): self
    {
        if (!$this->etablissements->contains($etablissement)) {
            $this->etablissements[] = $etablissement;
            $etablissement->setGh($this);
        }

        return $this;
    }

    public function removeEtablissement(Etablissement $etablissement): self
    {
        if ($this->etablissements->removeElement($etablissement)) {
            // set the owning side to null (unless already changed)
            if ($etablissement->getGh() === $this) {
                $etablissement->setGh(null);
            }
        }

        return $this;
    }
}
