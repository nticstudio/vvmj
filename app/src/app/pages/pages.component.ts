import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Etablissement, Grade, Groupement, Metier } from '../@core/models/referentiel';
import { ApiService } from '../@core/services/api.service'

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>     
      <nb-menu [items]="menu"></nb-menu> 
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[] =  [ 
  {
    title: 'Accueil',
    icon: 'home-outline',
    link: '/',
    home: true
  },
  {
    title: 'Mon tableau de bord',
    link: 'dashboard',
    icon: 'inbox-outline'
  },
  {
    title: 'Rechercher une visite',
    link: '/visites',
    icon: 'search-outline'
  },
  {
    title: 'Administration',
    link: '/admin',
    icon: 'settings-2-outline'
  },
  {
    title: 'Se connecter',
    link: '/',
    icon: 'lock-outline'
  },
];
   

  private api: ApiService;
  groupements: any[] = [];
  etablissements: Etablissement[]  = [];
  metiers: Metier[] = [];
  grades: Grade[] = [];

  constructor(api: ApiService) {
    this.api = api;
   
  }

  ngOnInit() {
   /* this.loadGroupements();
    this.loadEtablissements();
    this.loadMetiers();
    this.loadGrades();*/
  }
 /*
  async loadGroupements() {
    
     await this.api.get({
        url: "http://localhost:8000/api/groupements.json"
     }).subscribe(res => console.log(res));
  
  }

 async loadEtablissements(): Promise<void> {

    try {
      this.etablissements = await this.api.get<Etablissement[]>({
        url: "http://localhost:8000/api/etablissements.json"
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loadMetiers(): Promise<void> {

    try {
      this.metiers = await this.api.get<Metier[]>({
        url: "http://localhost:8000/api/metiers.json"
      });
    } catch (error) {
      console.log(error);
    }
  }


  async loadGrades(): Promise<void> {

    try {
      this.grades = await this.api.get<Grade[]>({
        url: "http://localhost:8000/api/grades.json"
      });
    } catch (error) {
      console.log(error);
    }

    
  }
*/







}
