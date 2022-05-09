import { Component, OnInit , Input} from '@angular/core';
import { User } from 'src/app/@core/models/user';

@Component({
  selector: 'app-apercu-user',
  templateUrl: './apercu-user.component.html',
  styleUrls: ['./apercu-user.component.scss']
})
export class ApercuUserComponent implements OnInit {

  @Input()  user: User = new User();
  constructor() {

   }

  ngOnInit(): void {
  }

}
