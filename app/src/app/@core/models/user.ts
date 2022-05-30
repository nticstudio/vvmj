import { Visite } from "./visite"

export class User {
    
    firstname: string = 'Prenom'
    lastname: string = 'Nom'
    email: string = 'prenom.nom@chu-lyon.fr'
    phone: string = 'telephone'
    password: string = 'none';
    visites: Array<Visite>  = []
    visitesChaperon: Array<Visite>  = []

    constructor(user?: any) {
        // this.firstname = "Prenom";
        // this.lastname = "Nom";
        // this.email = "prenom.nom@chu-lyon.fr";
        // this.phone = "telephone";      
        
        if(user) {
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.phone = user.phone;
        }
    }



    
}


