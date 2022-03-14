import { Component, OnInit } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit   {

  private api: ApiService;


  constructor(api: ApiService) {
    this.api = api;
   
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
