import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbDateService, NbWindowRef } from '@nebular/theme';
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

  constructor(private api: ApiService, private route: ActivatedRoute, private dateService: NbDateService<Date>,  private authService: NbAuthService) { 
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

}
