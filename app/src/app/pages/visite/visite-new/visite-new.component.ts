import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { Referentiel } from 'src/app/@core/models/referentiel';
import { User } from 'src/app/@core/models/user';
import { NewVisite } from 'src/app/@core/models/visite';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-visite-new',
  templateUrl: './visite-new.component.html',
  styleUrls: ['./visite-new.component.css']
})
export class VisiteNewComponent implements OnInit {
  visite: NewVisite;
  loading = false;
  user: any;
  SearchChaperon = false;
  terminated = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private dateService: NbDateService<Date>,  private authService: NbAuthService, private apiService: ApiService) { 
    this.visite = new NewVisite();
    this.terminated = false;
  }

  ngOnInit(): void {

    this.authService.onTokenChange()
    .subscribe((token: NbAuthToken) => {

      if (token.isValid()) {
      
        this.user = token.getPayload();
        this.visite.created_by = `api/users/${this.user.id}`;
      }
      else {
        console.log('EXPIRED!!');
      }

    });
  }



  
  getChaperon(event: User) {
    console.log('Current chaperon ',event);

    
    if(event) {
     
      this.visite.chaperon = event
      console.log('change chameron select ',this.visite.chaperon)
      this.switchSearch();
     // this.metierCode = event.code;
    }
    
  }

  switchSearch() {
    this.SearchChaperon = !this.SearchChaperon;
    console.log(this.SearchChaperon);
  }

  async submit() {
    console.log(this.visite);
   
    const u = await this.api.getUserByEmailOrCreate(this.visite.chaperon);

    if(u) {
    this.visite.chaperon = `api/users/${u.id}`;    
    console.log(u);
    console.log(this.visite);
    const r = await this.api.postVisite(this.visite);
    this.terminated = true;
    }
    else {
      console.log("erreur lors de la création");
    }

  }

  currentUf(event: Referentiel) {
    console.log('Current uf ',event);

    if(event) {      
       this.visite.uf = `api/unites/${event.id}`;
    }
    
  }


  currentMetier(event: Referentiel) {
    console.log('Current metier ',event);

    
    if(event) {
      console.log('change metier select');
      this.visite.metier =  `api/metiers/${event.id}`;
    }
    
  }

}
