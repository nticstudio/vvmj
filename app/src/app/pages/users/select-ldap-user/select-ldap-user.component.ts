import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Groupement, Referentiel } from 'src/app/@core/models/referentiel';
import { User } from 'src/app/@core/models/user';
import { ApiService } from 'src/app/@core/services/api.service';


@Component({
  selector: 'app-select-ldap-user',
  templateUrl: './select-ldap-user.component.html',
  styleUrls: ['./select-ldap-user.component.scss']
})
export class SelectLdapUserComponent implements OnInit {

  @Output() value = new EventEmitter<any>();
  @Input() label = '';
  @Input() initValue = '';
  @Input() source = 'local';

  userselect: string = '';
  datas: any[] = [];
  filtered!: Observable<any[]>;
  currentItem!: User;
  private api: ApiService;


  constructor(api: ApiService) { 
    this.api = api;
  }

  ngOnInit(): void {
   
    // if(this.source == 'local')
      // this.api.getUsers().then(x => this.datas = x).then(x => this.filtered = of(this.datas));

  }
  
/*  async onUserChange(value: string) {
    console.log('onUserChange');

    if(this.source != 'local')
      await this.api.searchLdap(value).then(x => this.datas = x).then(x => this.filtered = of(this.datas));
      
      this.filtered = of(this.filter(value));
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    let r = this.datas.filter(optionValue => optionValue.firstname.toLowerCase().includes(filterValue) || optionValue.lastname.toLowerCase().includes(filterValue));
    return r;
    
  }*/


  async onEnter() {
    console.log('on enter '+this.userselect);
    await this.api.searchLdap(this.userselect).then(x => this.datas = x).then(x => this.filtered = of(this.datas));
  
    //let r = this.datas.filter(optionValue => optionValue.firstname.toLowerCase().includes(filterValue) || optionValue.lastname.toLowerCase().includes(filterValue));
    console.log(this.datas);
    this.value.emit(this.datas[0]);  
  //  return r;
  }

  userEvent(event: string) {
    console.log( `Child userEvent : ${event}`);
    
   // this.value.emit(this.datas.find(optionValue => optionValue.email.toLowerCase().includes(event.toLowerCase())));   
  }


}
