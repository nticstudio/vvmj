import { Unite } from './referentiel'
import { Inscription} from './inscription'
import { User} from './user'

export interface Visite {
    uf: Unite;
    presentation: string;
    date: Date;
    hdebut: string;
    hfin: string;
    consigne: string;
    inscriptions: Inscription[];
    places: number;
    created_by: User;
}
