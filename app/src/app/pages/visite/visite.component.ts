import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Groupement, Etablissement, Metier, Grade, Referentiel } from 'src/app/@core/models/referentiel';
import { ApiService } from 'src/app/@core/services/api.service';
import { VisiteListComponent } from './visite-list/visite-list.component';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {

  @ViewChild(VisiteListComponent) private visiteList!: VisiteListComponent;

  submitted = false;
  groupement!: Referentiel;
  etablissement!: Referentiel;
  etablissementCode: string = '';
  groupementCode: string = '';
  ufCode: string = '';
  metierCode: string = '';


  // groupements: Groupement[] = [];
  // filteredGroupements!: Observable<Groupement[]>;
  // etablissements: Etablissement[]  = [];
  // metiers: Metier[] = [];
  // grades: Grade[] = [];

  
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
   }

  ngOnInit(): void {
   /* this.loadGroupements().then(() =>
     
        this.filteredGroupements = of(this.groupements)
    
      
    );*/
  }

  onSubmit() : void { 
    this.submitted = true;  

    console.log("Groupement = "+this.groupementCode);
    console.log("Etablissmeent = "+this.etablissementCode);
    console.log("Unite = "+this.ufCode);
    console.log("MEtier = "+this.metierCode);

   this.visiteList.search();
      
  }

  currentEtablissement(event: Referentiel) {
    console.log('Current etablissement ',event);

    //this.etablissement = event;
    if(event) {
      console.log('change etab select');
      this.etablissementCode = event.code;
    }
    else {
      this.etablissementCode = '';
    }
    
    
  }

  currentGroupement(event: Referentiel) {
    console.log('Current groupement ',event);

    //this.etablissement = event;
    if(event) {
      this.groupementCode = event.code;
    }
    else {
      this.groupementCode = '';
    }

    console.log('change gh select '+ this.groupementCode);

    
    
  }

  currentUf(event: Referentiel) {
    console.log('Current uf ',event);

    if(event) {
      console.log('change uf select');
      this.ufCode = event.code;
    }
  else {
    this.ufCode = '';
  }
    
  }

  currentMetier(event: Referentiel) {
    console.log('Current metier ',event);

    
    if(event) {
      console.log('change metier select');
      this.metierCode = event.code;
    }
    else {
      this.metierCode = '';
    }
    
  }

}
