import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Referentiel } from 'src/app/@core/models/referentiel';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-unite-select',
  templateUrl: './unite-select.component.html',
  styleUrls: ['./unite-select.component.scss']
})
export class UniteSelectComponent implements OnInit, OnChanges {

  
  @Output() value = new EventEmitter<Referentiel>();
  @Input()  label = 'Unite fonctionnelle';
  @Input()  parentCode = '';
  @Input() status = false;

  uniteselect: string = '';
  datas: Referentiel[] = [];
  filtered!: Observable<any[]>;
  private api: ApiService;
  currentsearch: boolean = false;


  constructor(api: ApiService) { 
    this.api = api;
  }


  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes);
   console.log(this.parentCode);
   for (const propName in changes) {
    const changedProp = changes[propName];
     if(propName == 'parentCode' && changedProp.currentValue != changedProp.previousValue) {
      this.search();
     }
   }  
  }

  ngOnInit(): void {
    this.filtered = of(this.datas);

   // this.api.getUFs(this.parentCode).then(x => this.datas = x).then(x => this.filtered = of(this.datas));
    
  }

  private search() {
    this.currentsearch = true;
    this.api.getUFs(this.status,this.parentCode).then(x => this.datas = x).then(()=> {
      this.filtered = of(this.datas);
      this.uniteselect = '';
      this.currentsearch = false;
    });
  }

  onUniteSelectChange(value: string) {
    console.log('onUniteSelectChange '+this.parentCode);
    if(this.datas.length == 0 && this.parentCode != "" && !this.currentsearch) {     
      this.search();
    } else {
  //  this.filtered = of(this.datas);
    this.filtered = of(this.filter(value));   
    }
  
  }


   filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.datas.filter(optionValue => optionValue.libelle.toLowerCase().includes(filterValue));
    
  }

  uniteEvent(event: string) {
    console.log( `Child unite : ${event}`);
    this.value.emit(this.datas.find(optionValue => optionValue.libelle.toLowerCase().includes(event.toLowerCase())));   
  }

  clear() {
    
    console.log('Clear : '+this.uniteselect)
    this.uniteselect = '';
    this.value.emit(undefined);
    // relance 2x
    this.value.emit(undefined);
  }

}
