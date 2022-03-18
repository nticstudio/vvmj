import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { User } from 'src/app/@core/models/user';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  current: any
  constructor(private api: ApiService,  private authService: NbAuthService) { 
    
  }

  ngOnInit(): void {
 
    this.authService.getToken()
    .subscribe((token: NbAuthToken) => {

      if (token.isValid()) {
        this.current = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
        console.log(this.current);
      }

    });
  }

  

}
