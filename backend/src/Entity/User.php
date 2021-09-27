<?php

namespace App\Entity;

use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *          "me"={
 *               "path"= "/me",
 *               "method" = "get",
 *               "controller" = MeController::class,
 *               "read"= false
 *           },
 *          "get"
 *     },
 *    normalizationContext= { "groups": {"read:users"}},
 *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"read:users","read:user"}}
 *           }
 *      }
 * )
 * @Gedmo\SoftDeleteable()
 */
class User implements UserInterface, JWTUserInterface
{

    use TimestampableEntity;
    use SoftDeleteableEntity;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:users"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"read:users"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:users"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:users"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:users"})
     */
    private $phone;

    /**
     * @ORM\Column(type="json")
     * @Groups({"read:users"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var \DateTime
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     * @Groups({"read:users"})
     */
    protected $createdAt;

    /**
     * @var \DateTime
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     * @Groups({"read:user"})
     */
    protected $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Visite::class, mappedBy="created_by")
     */
    private $visites;

    /**
     * @ORM\OneToMany(targetEntity=Visite::class, mappedBy="chaperon")
     */
    private $visitesChaperon;

    public function __construct()
    {
        $this->visites = new ArrayCollection();
        $this->visitesChaperon = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }
   
    public function setId(?int $id):self 
    {
        $this->id = $id;

        return $this;

    }

    public static  function createFromPayload($id, array $payload) {
        $user =  (new User())->setId($id)->setEmail($payload['email'])->setLastname($payload['lastname'])->setFirstname($payload['firstname'])->setPhone($payload['phone']);

       // $user->setId($payload->id)

       return $user;

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
            $visite->setCreatedBy($this);
        }

        return $this;
    }

    public function removeVisite(Visite $visite): self
    {
        if ($this->visites->removeElement($visite)) {
            // set the owning side to null (unless already changed)
            if ($visite->getCreatedBy() === $this) {
                $visite->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Visite[]
     */
    public function getVisitesChaperon(): Collection
    {
        return $this->visitesChaperon;
    }

    public function addVisitesChaperon(Visite $visitesChaperon): self
    {
        if (!$this->visitesChaperon->contains($visitesChaperon)) {
            $this->visitesChaperon[] = $visitesChaperon;
            $visitesChaperon->setChaperon($this);
        }

        return $this;
    }

    public function removeVisitesChaperon(Visite $visitesChaperon): self
    {
        if ($this->visitesChaperon->removeElement($visitesChaperon)) {
            // set the owning side to null (unless already changed)
            if ($visitesChaperon->getChaperon() === $this) {
                $visitesChaperon->setChaperon(null);
            }
        }

        return $this;
    }

   public function  getUserIdentifier() {
       return "email";
   }
} 
