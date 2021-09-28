import  axios  from "axios";
import { ErrorHandler, Injectable } from '@angular/core';


import { AxiosInstance } from "axios";
import { Grade } from '../models/referentiel';

export interface Params {
	[ key: string ]: any;
}
 
export interface GetOptions {
	url: string;
	params?: Params;
}
 
export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}


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

   public async get<T>( options: GetOptions ): Promise<T>  {
 
		try {
      
 
			var axiosResponse = await this.client.request<T>({
				method: "get",
        url: options.url
      });
 
			return( axiosResponse.data );
 
		} catch ( error ) {
       
      return( Promise.reject(this.normalizeError( error )) );   
 
		}
  
  }


  private normalizeError( error: any ) : ErrorResponse {
 
    this.errorHandler.handleError( error );
    
    
 
		// NOTE: Since I'm not really dealing with a production API, this doesn't really
		// normalize anything (ie, this is not the focus of this demo).
		return({
			id: "-1",
			code: error.response.status,
      message: error.response.data.detail,
      // status: false
		});
 
	}
}
