import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Referentiel } from 'src/app/@core/models/referentiel';
import { ApiService } from 'src/app/@core/services/api.service';


@Component({
  selector: 'app-etablissement-select',
  templateUrl: './etablissement-select.component.html',
  styleUrls: ['./etablissement-select.component.scss']
})
export class EtablissementSelectComponent implements OnInit, OnChanges {

  @Output() value = new EventEmitter<Referentiel>();
  @Input() label = '';
  @Input() parentCode = '';
  @Input() initValue = '';


  etablissementselect: string = '';
  datas: Referentiel[] = [];
  filtered!: Observable<any[]>;
  currentItem!: Referentiel;
  private api: ApiService;
  currentsearch: boolean = false;



  constructor(api: ApiService) {
    this.api = api;
  }

  ngOnInit(): void {
    
   // this.search();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.parentCode);
    for (const propName in changes) {
      const changedProp = changes[propName];
      if (propName == 'parentCode' && changedProp.currentValue != changedProp.previousValue) {
        this.search();
      }
    }
  }

  
  private search() {
    if(!this.currentsearch) {
    this.currentsearch = true;
    this.api.getEtablissements(this.parentCode).then(x => this.datas = x).then(()=> {
      this.filtered = of(this.datas);
      this.etablissementselect = '';
      this.currentsearch = false;
    });
  }
  }


  onEtablissementChange(value: string) {
    console.log('onEtablissementChange');
    if(this.datas.length == 0 && this.parentCode != "" && !this.currentsearch) {
      this.search();
    } else {
    this.filtered = of(this.filter(value));
    }
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.datas.filter(optionValue => optionValue.libelle.toLowerCase().includes(filterValue));
  }

  etablissementEvent(event: string) {
    this.value.emit(this.datas.find(optionValue => optionValue.libelle.toLowerCase().includes(event.toLowerCase())));
  }


}
