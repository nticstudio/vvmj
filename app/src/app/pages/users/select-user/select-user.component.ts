import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Groupement, Referentiel } from 'src/app/@core/models/referentiel';
import { User } from 'src/app/@core/models/user';
import { ApiService } from 'src/app/@core/services/api.service';


@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {

  @Output() value = new EventEmitter<User>();
  @Input()  label = '';
  @Input() initValue = '';

  userselect: string = '';
  datas: User[] = [];
  filtered!: Observable<any[]>;
  currentItem!: User;
  private api: ApiService;


  constructor(api: ApiService) { 
    this.api = api;
  }

  ngOnInit(): void {
   
    this.api.getUsers().then(x => this.datas = x).then(x => this.filtered = of(this.datas));

    if(this.initValue != '') {
      console.log('INIT VALUE GROUPEMENT');
      this.filtered = of(this.filter(this.initValue));
      this.value.emit(this.datas.find(optionValue => optionValue.email == this.initValue)); 
    }


  }
  
  onUserChange(value: string) {
    console.log('onUserChange');
      this.filtered = of(this.filter(value));
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.datas.filter(optionValue => optionValue.firstname.toLowerCase().includes(filterValue));
    
  }

  userEvent(event: string) {
    console.log( `Child userEvent : ${event}`);
    this.value.emit(this.datas.find(optionValue => optionValue.firstname.toLowerCase().includes(event.toLowerCase())));
   
  }


}
