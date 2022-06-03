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

  loading = false;
  constructor(api: ApiService) { 
    this.api = api;
  }

  ngOnInit(): void {
   
  
  }


  async onEnter() {
    this.loading = true;
    console.log('on enter '+this.userselect);
    await this.api.searchLdap(this.userselect).then(x => this.datas = x).then(x => this.filtered = of(this.datas));
  
    console.log(this.datas);
    this.value.emit(this.datas[0]);
    this.loading = false;  
  }

  preventKeyup() {
    return false;
  }


}
