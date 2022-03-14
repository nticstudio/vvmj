import { Etablissement, Groupement, Metier, Unite } from './referentiel'
import { Inscription} from './inscription'
import { User} from './user'

export interface VisiteImpl {
    uf?: Unite;
    presentation: string;
    date: Date;
    hdebut?: Date;
    hfin?: Date;
    consigne: string;
    inscriptions: Inscription[];
    places: number;
    created_by: User;
    gh?: Groupement;
    eg?: Etablissement;
    metier?: Metier;
    chaperon: User;

    
    
}

export class Visite implements VisiteImpl {
    uf?: Unite
    presentation: string = ''
    date: Date
    hdebut?: Date
    hfin?: Date
    consigne: string = ''
    inscriptions: Inscription[] = []
    places: number = 0;
    created_by: User
    gh?: Groupement
    eg?: Etablissement
    metier?: Metier
    chaperon: User

    constructor() {
        this.date = new Date();
        this.created_by = new User();
        this.chaperon = new User();
        

    }



}


