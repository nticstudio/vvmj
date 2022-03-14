import  axios  from "axios";
import { ErrorHandler, Injectable } from '@angular/core';


import { AxiosInstance } from "axios";
import { Grade, Referentiel } from '../models/referentiel';
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface Params {
	[ key: string ]: any;
}
 
export interface GetOptions {
	url: string;
	params?: HttpParams;
}
 
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

// const environment.API_URL: string = "http://localhost:8000/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private client: AxiosInstance;
  private errorHandler: ErrorHandler;
  

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    this.client = axios.create({
         headers: {
          "X-Custom-Auth": Date.now().toString()      
         }
    });

   }

   async get( options: GetOptions) {
     const url = options.params && options.params.toString() != ""  ? `${options.url}?${options.params}` : `${options.url}`;
     try {
       let response = await this.client.get(url);
       let data = await response.data;

     return data;

    } catch ( error ) {
       
      return this.normalizeError( error );   
 
		}
   }

   async getByLibelle( options: GetOptions, libelle: string) {

    
    try {
      let response = await this.client.get(`${options.url}?libelle=${libelle}`);
      let data = await response.data;

    return data;

   } catch ( error ) {
      
     return this.normalizeError( error );   

   }
  }


  async getByCode( options: GetOptions, codeValue: string) {

    try {
      let response = await this.client.get(`${options.url}/${codeValue}`);
      let data = await response.data;

    return data;

   } catch ( error ) {
      
     return this.normalizeError( error );   

   }
  }


  
  async getByParentCode( options: GetOptions, codeName: string,codeValue: string, libelle?: string) {

    try {
      let uri = `${options.url}?${codeName}=${codeValue}`;
      
      if(libelle)
        uri += `&libelle=${libelle}`

      let response = await this.client.get(`${uri}`);
      let data = await response.data;

    return data;

   } catch ( error ) {
      
     return this.normalizeError( error );   

   }
  }

  async getGroupement(code: string) {
    return await this.get({ url: `${environment.API_URL}/groupements/${code}.json`});
  }


   async getGroupements(libelle?: string) {

    let params = new HttpParams()

    
    if(libelle)
       params =params.set('libelle',libelle);
  
    
    return await this.get({ url: `${environment.API_URL}/groupements.json`, params});       

  }

  
  async getEtablissement(code: string) {
    return await this.get({ url: `${environment.API_URL}/etablissements/${code}.json`});
  }


   async getEtablissements(gh?: string,libelle?: string) {
 
        let params = new HttpParams()

    
        if(libelle)
           params = params.set('libelle',libelle);
        if(gh)
           params = params.set('gh.code',gh);
      
 
    
    return await this.get({url:`${environment.API_URL}/etablissements.json`, params});       

  }


  async getUF(code: string) {
    return await this.get({ url: `${environment.API_URL}/unites/${code}.json`});
  }


  async getUFs(eg: string, libelle?: string ) {
    let params = new HttpParams()

    if(eg)
       params = params.set('eg.code',eg);
    if(libelle)
       params = params.set('libelle',libelle);

     return await this.get({ url: `${environment.API_URL}/unites.json`, params});       

  }

  async getMetier(code: string) {
    return await this.get({ url: `${environment.API_URL}/metiers/${code}.json`});
  }


  async getMetiers(libelle?: string ) {
    let params = new HttpParams()

    if(libelle)
       params = params.set('libelle',libelle);
    
    return await this.get({ url: `${environment.API_URL}/metiers.json`,params});     

  }

  async getVisites(uf?: string, metier?: string) {
    let params = new HttpParams()

    
    if(metier)
       params =params.set('metier.code',metier);
    
    if(uf)
       params = params.set('uf.code',uf);

    
    return await this.get({ url: `${environment.API_URL}/visites.json`,  params});     

  }

  async getVisite(id: string) {
    let params = new HttpParams()
    
    return await this.get({ url: `${environment.API_URL}/visites/${id}.json`,  params});     

  }



  private normalizeError( error: any ) {
 
    this.errorHandler.handleError( error );
    
    console.log(error);
 
		// NOTE: Since I'm not really dealing with a production API, this doesn't really
		// normalize anything (ie, this is not the focus of this demo).
		return({
			id: "-1",
			code: error.response.status,
      message: error.response.data.detail,
      // status: false
		});
 
	}


  async getUsers(lastname?: string) {

    let params = new HttpParams()

    
    if(lastname)
       params =params.set('lastname',lastname);
  
    
    return await this.get({ url: `${environment.API_URL}/users.json`, params});       

  }

  async getMe() {

    
    return await this.get({ url: `${environment.API_URL}/me`});       

  }

}
