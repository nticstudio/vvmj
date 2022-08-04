import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { User } from 'src/app/@core/models/user';
import { Visite } from 'src/app/@core/models/visite';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-visite-edit',
  templateUrl: './visite-edit.component.html',
  styleUrls: ['./visite-edit.component.css']
})
export class VisiteEditComponent implements OnInit {

  visiteId: any;
  visite: Visite;
  etablissementCode: string = '';
  groupementCode: string = '';
  ufCode: string = '';
  metierCode: string = '';
  created_by: string = '';
  loading = true;
  created_by_shortname: string = '';
  chaperon_shortname: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private dateService: NbDateService<Date>, public windowRef: NbWindowRef) { 
    this.visite = new Visite();
  }

  ngOnInit(): void {
   this.getVisite();
  }


  async getVisite() {   
    
  //  this.visiteId = this.route.snapshot.params['id'];
    if(this.visiteId && this.visiteId != "") {
 
      console.log(this.visiteId);
   
       this.visite = await this.api.getVisite(this.visiteId);       
       console.log(this.visite);

       this.created_by_shortname = this.shortname(this.visite.created_by);
       this.chaperon_shortname = this.shortname(this.visite.chaperon);
       
       this.loading = false;

       
    //   console.log( this.dateService.getDateFormat());
    //   // console.log(this.visite.created_by.shortname())
    //   console.log(this.created_by_shortname());

    //   console.log(this.visite.gh?.libelle)
      
    //  // this.visite.hdebut =   this.dateService.today();
    //  // this.visite.date =   this.dateService.clone(this.visite.date);
 
    }
  }


 private  shortname(prop: User) {

  console.log(prop);
  const firstname =  prop.firstname && prop.firstname.length
  ? (prop.firstname.charAt(0).toUpperCase() + prop.firstname.slice(1).toLowerCase())
  : ''; 

  const lastname =prop.lastname.toUpperCase();

  return `${firstname} ${lastname},  ${prop.email}`;
 }
/*
 close() {
  this.windowRef.close();
}
*/


}
