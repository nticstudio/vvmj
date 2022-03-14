import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/@core/models/user';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  current: User
  constructor(private api: ApiService) { 
    this.current = new User();
  }

  ngOnInit(): void {
    this.search()
  }

  private async search() {   
    await this.api.getMe().then(x => this.current = x);
  }

}
