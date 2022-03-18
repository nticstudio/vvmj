import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit   {

  private api: ApiService;
  routeLink: string = '/auth/login';

  constructor(api: ApiService, private authService: NbAuthService) {
    this.api = api;

    this.authService.isAuthenticated() .subscribe((result) => {
      if(result) {
        this.routeLink = '/visites/propose';
       }
       }
     );
   
  }

  ngOnInit() {
    // Axios.get('http://localhost:8000/api/groupements.json').subscribe(
    //   (v) => console.log(v)
    // );

    // this.api.get({url: 'http://localhost:8000/api/groupements.json'}).subscribe(
    //   (v) => console.log(v)
    // );
   
   }
  
}
