import { Etablissement, Groupement, Metier, Unite } from './referentiel'
import { Inscription} from './inscription'
import { User } from './user';


export interface VisiteImpl {
    uf?: Unite;
    presentation: string;
    date?: Date;
    hdebut?: Date;
    hfin?: Date;
    consigne: string;
    inscriptions: Inscription[];
    places: number;
    created_by?: any;
    gh?: Groupement;
    eg?: Etablissement;
    metier?: Metier;
    chaperon?: any;
 

    
    
}

export class Visite implements VisiteImpl {
    uf?: Unite
    presentation: string = ''
    date?: Date
    hdebut?: Date
    hfin?: Date
    consigne: string = ''
    inscriptions: Inscription[] = []
    places: number = 0;
    created_by?: any
    gh?: Groupement
    eg?: Etablissement
    metier?: Metier
    chaperon?: any;
    id?: number

    constructor() {
        this.date = new Date();
        this.chaperon = new User()
       // this.created_by = created_by;
     //   this.chaperon = new User();
        

    }



}


export class NewVisite  {
    uf?: any = ''
    presentation: string = ''
    date?: Date
    hdebut?: Date
    hfin?: Date
    consigne: string = ''
    inscriptions: Inscription[] = []
    places: number = 0;
    created_by?: any
    metier?:  string = ''
    chaperon?: any;

    constructor() {
        this.date = new Date();
        this.chaperon = new User()
       // this.created_by = created_by;
     //   this.chaperon = new User();
        

    }



}

