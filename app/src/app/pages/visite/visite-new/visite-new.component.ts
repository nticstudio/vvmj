import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { User } from 'src/app/@core/models/user';
import { Visite } from 'src/app/@core/models/visite';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-visite-new',
  templateUrl: './visite-new.component.html',
  styleUrls: ['./visite-new.component.css']
})
export class VisiteNewComponent implements OnInit {
  visite: Visite;
  loading = false;
  user: any;
  SearchChaperon = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private dateService: NbDateService<Date>,  private authService: NbAuthService, private apiService: ApiService) { 
    this.visite = new Visite();
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
    const r = await this.api.postVisite(this.visite);

    console.log(r);

  }

}
