import { Component, OnInit } from '@angular/core';
import { Etablissement, Grade, Groupement, Metier } from '../@core/models/referentiel';
import { ApiService } from '../@core/services/api.service'

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private api: ApiService;
  groupements: Groupement[] = [];
  etablissements: Etablissement[]  = [];
  metiers: Metier[] = [];
  grades: Grade[] = [];

  constructor(api: ApiService) {
    this.api = api;
  }

  ngOnInit() {
    this.loadGroupements();
    this.loadEtablissements();
    this.loadMetiers();
    this.loadGrades();
  }

  async loadGroupements(): Promise<void> {

    try {
      this.groupements = await this.api.get<Groupement[]>({
        url: "http://localhost:8000/api/groupements.json"
      });
    } catch (error) {
      console.log(error);
    }
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








}
