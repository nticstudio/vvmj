Structure
groupement    id code libellé actif
etablissement id code libellé actif  id_groupement 
uf            id code libellé actif id_etablissement
metier        id code libellé
grade         id code libellé

Utilisateur
firsname lastname phone email role (accueillant, dpas)


Visite
id id_uf id_metier date heure_deb heure_fin place_total place_dispo 
presentation lieu consigne created_by created_at update_at status 
accueillant_firstname accueillant_lastname accueillant_phone accueillant_email

Inscription
id matricule firstname lastame email grade uf id_visite created_at updated_at status

liste_diffusion
id libelle 

message
id libellé created_at update_at status type (visiteurs ou accueillant)

