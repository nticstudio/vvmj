export interface Referentiel {
    code: string;
    libelle: string;
    status: boolean;
}

export interface Groupement extends Referentiel {
    etablissements: Etablissement[];
}


export interface Etablissement extends Referentiel {
    unites: Unite[]
}

export interface Unite extends Referentiel {

}

export interface Metier extends Referentiel {
}

export interface Grade extends Referentiel {

}