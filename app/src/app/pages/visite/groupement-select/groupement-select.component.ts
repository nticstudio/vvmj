import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Groupement, Referentiel } from 'src/app/@core/models/referentiel';
import { ApiService } from 'src/app/@core/services/api.service';


@Component({
  selector: 'app-groupement-select',
  templateUrl: './groupement-select.component.html',
  styleUrls: ['./groupement-select.component.scss']
})
export class GroupementSelectComponent implements OnInit {

  @Output() value = new EventEmitter<Groupement>();
  @Input()  label = '';
  @Input() initValue = '';
  @Input() status = false;

  groupementselect: string = '';
  datas: Groupement[] = [];
  filtered!: Observable<any[]>;
  currentItem!: Groupement;
  private api: ApiService;


  constructor(api: ApiService) { 
    this.api = api;
  }

  ngOnInit(): void {
   
    this.api.getGroupements(this.status).then(x => this.datas = x).then(x => this.filtered = of(this.datas));

    if(this.initValue != '') {
      console.log('INIT VALUE GROUPEMENT');
      this.filtered = of(this.filter(this.initValue));
      this.value.emit(this.datas.find(optionValue => optionValue.code == this.initValue)); 
    }


  }
  
  onGroupementChange(value: string) {
    console.log(`onGroupementChange ${value}`);
      this.filtered = of(this.filter(value));
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.datas.filter(optionValue => optionValue.libelle.toLowerCase().includes(filterValue));
    
  }

  groupementEvent(event: string) {
    console.log( `Child groupementEvent : ${event}`);
    this.value.emit(this.datas.find(optionValue => optionValue.libelle.toLowerCase().includes(event.toLowerCase())));
   
  }

  clear() {
    
    console.log('Clear : '+this.groupementselect)
    this.groupementselect = '';
    this.value.emit(undefined);
    // relance 2x
    this.value.emit(undefined);
  }


}
