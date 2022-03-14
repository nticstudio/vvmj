import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Referentiel } from 'src/app/@core/models/referentiel';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-metier-select',
  templateUrl: './metier-select.component.html',
  styleUrls: ['./metier-select.component.scss']
})
export class MetierSelectComponent implements OnInit {

  
  @Output() value = new EventEmitter<Referentiel>();
  @Input()  label = '';


  metierselect: string = '';
  datas: Referentiel[] = [];
  filtered!: Observable<any[]>;
  private api: ApiService;
  currentsearch: boolean = false;


  constructor(api: ApiService) { 
    this.api = api;
  }



  ngOnInit(): void {  
    
      this.currentsearch = true;
      this.api.getMetiers().then(x => this.datas = x).then(() => { this.currentsearch = false; this.filtered = of(this.datas);});  
  }

  onMetierSelectChange(value: string) {
    console.log('onMetierSelectChange');
    
  //  this.filtered = of(this.datas);
    this.filtered = of(this.filter(value));

  
  
  }


   filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.datas.filter(optionValue => optionValue.libelle.toLowerCase().includes(filterValue));
    
  }

  metierEvent(event: string) {
    console.log( `Child metier : ${event}`);
    this.value.emit(this.datas.find(optionValue => optionValue.libelle.toLowerCase().includes(event.toLowerCase())));   
  }

}
