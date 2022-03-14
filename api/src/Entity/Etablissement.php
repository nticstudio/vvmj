<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EtablissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
* @ApiResource(
 *    normalizationContext= { "groups": {"read:etablissements"}},
   *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:etablissements"}}
 *           }
 *    }
 * )
 * @ORM\Entity(repositoryClass=EtablissementRepository::class)
 * @ApiFilter(
 *    SearchFilter::class, properties = {"id":"exact","code":"partial", "libelle": "partial", "gh.code":"exact"}
 * )
 */
class Etablissement
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:etablissements"}) 
     * @Groups({"read:visites"}) 
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:etablissements"}) 
     * @Groups({"read:visites"}) 
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:etablissements"}) 
     * @Groups({"read:visites"}) 
     */
    private $libelle;

    /**
     * @ORM\ManyToOne(targetEntity=Groupement::class, inversedBy="etablissements")
     * @ORM\JoinColumn(nullable=false)
     */
    private $gh;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Unite::class, mappedBy="eg")
     */
    private $unites;

    public function __construct(string $code = null, string $libelle = null)
    {
        $this->unites = new ArrayCollection();

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

    public function getGh(): ?groupement
    {
        return $this->gh;
    }

    public function setGh(?groupement $gh): self
    {
        $this->gh = $gh;

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
     * @return Collection|Unite[]
     */
    public function getUnites(): Collection
    {
        return $this->unites;
    }

    public function addUnite(Unite $unite): self
    {
        if (!$this->unites->contains($unite)) {
            $this->unites[] = $unite;
            $unite->setEg($this);
        }

        return $this;
    }

    public function removeUnite(Unite $unite): self
    {
        if ($this->unites->removeElement($unite)) {
            // set the owning side to null (unless already changed)
            if ($unite->getEg() === $this) {
                $unite->setEg(null);
            }
        }

        return $this;
    }
}
