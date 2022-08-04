import  axios  from "axios";
import { ErrorHandler, Injectable } from '@angular/core';


import { AxiosInstance } from "axios";
import { Grade, Referentiel } from '../models/referentiel';
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

import { NbAuthToken , NbAuthService, NbTokenStorage } from '@nebular/auth';

export interface Params {
	[ key: string ]: any;
}
 
export interface GetOptions {
	url: string;
	params?: HttpParams;
  data?: any;
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
  

  constructor(errorHandler: ErrorHandler, private authService: NbAuthService) {
    this.errorHandler = errorHandler;

    this.client = axios.create({
      headers: {
        "X-Custom-Auth": Date.now().toString()
      }
    });
    

    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {

        if (token.isValid()) {
          // this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
          this.client = axios.create({
            headers: {
              "X-Custom-Auth": Date.now().toString(),
              "Authorization": 'Bearer ' + token.getValue()
            }
          });
        }
        else {
          console.log('EXPIRED!!');
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


   async post( options: GetOptions) {
    const url =  `${options.url}`;
    try {
      let response = await this.client.post(url, options.data);
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


  async getGroupements(status: boolean, libelle?: string) {

    let params = new HttpParams()
    params = params.set('status',status);
    
    if(libelle)
       params = params.set('libelle',libelle);
  
    
    return await this.get({ url: `${environment.API_URL}/groupements.json`, params});       

  }

  
  async getEtablissement(code: string) {
    return await this.get({ url: `${environment.API_URL}/etablissements/${code}.json`});
  }


   async getEtablissements(status: boolean, gh?: string,libelle?: string) {
 
        let params = new HttpParams()
        params = params.set('status',status);
    
        if(libelle)
           params = params.set('libelle',libelle);
        if(gh)
           params = params.set('gh.code',gh);
      
 
    
    return await this.get({url:`${environment.API_URL}/etablissements.json`, params});       

  }


  async getUF(code: string) {
    return await this.get({ url: `${environment.API_URL}/unites/${code}.json`});
  }


  async getUFs(status: boolean, eg: string, libelle?: string ) {
    let params = new HttpParams()

    params = params.set('status',status);

    if(eg)
       params = params.set('eg.code',eg);
    if(libelle)
       params = params.set('libelle',libelle);

     return await this.get({ url: `${environment.API_URL}/unites.json`, params});       

  }

  async getMetier(code: string) {
    return await this.get({ url: `${environment.API_URL}/metiers/${code}.json`});
  }


  async getMetiers(status: boolean, libelle?: string ) {
    let params = new HttpParams()

    params = params.set('status',status);

    if(libelle)
       params = params.set('libelle',libelle);
    
    return await this.get({ url: `${environment.API_URL}/metiers.json`,params});     

  }

  async getVisites(uf?: string, eg?: string, gh?: string , metier?: string,) {
    let params = new HttpParams()

    
    if(metier && metier != '')
       params =params.set('metier.code',metier);
    
   
     if(uf && uf != '')
       params = params.set('uf.code',uf);
     else {

              
          if(eg && eg != '' ) {
            params = params.set('uf.eg.code',eg);
          } else {

          if(gh && gh != '') {
            params = params.set('uf.eg.gh.code',gh);
          }
        }
      }


    
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

  
  async getUserByEmail(email: string) {

    let params = new HttpParams()


    if(email == "")
      return({
        id: "-1",
        message: "email missing",
        // status: false
      });
   
    params = params.set('email',email);
 
    
    const user =  await this.get({ url: `${environment.API_URL}/users.json`, params});       

    console.log(user);

    if(user.length == 0)
       return false

    return user;


  }


  async getUserByEmailOrCreate(user: any) {
    let search  = await this.getUserByEmail(user.email);
 
    
    if(!search) {
      let data = new User(user);    
      return await this.post({ url: `${environment.API_URL}/users.json`, data});  
    }

    return search[0];
  }

  async getMe() {

    
    return await this.get({ url: `${environment.API_URL}/me`});       

  }


  async searchLdap(search?: string) {

    let params = new HttpParams()

    
    if(search)
       params =params.set('search',search);
  
    
    return await this.get({ url: `${environment.API_URL}/ad/search/${search}`});       

  }


  async postVisite(data: any) {
    return await this.post({ url: `${environment.API_URL}/visites.json`, data});   
  }

}
