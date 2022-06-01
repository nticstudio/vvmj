import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { Visite } from 'src/app/@core/models/visite';
import { ApiService } from 'src/app/@core/services/api.service';
import { NbWindowService } from '@nebular/theme';
import {VisiteEditComponent } from '../visite-edit/visite-edit.component'
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-visite-list',
  templateUrl: './visite-list.component.html',
  styleUrls: ['./visite-list.component.css']
})
export class VisiteListComponent implements OnInit {

  @Input()  groupementCode = '';
  @Input()  etablissementCode = '';
  @Input()  ufCode = '';
  @Input()  metierCode = '';
  api: ApiService;
  visites: Array<Visite> = [];

  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions : {
      columnTitle: 'Détails',
      position: 'right',
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: 'view',
          title: '<i class="nb-search"></i>' ,
        },
        {
          name: 'newinscription',
          title: '<i class="nb-plus"></i>',
        },
      ]
    },
    mode: 'external',
    noDataMessage: 'Aucun résultat trouvé',
    hideSubHeader: true,

    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter: false
      // },
      gh: {
        title: 'Groupement',
        type: 'string',
        filter: false,
         width: '20%',
        valuePrepareFunction: this.refentielDisplay
      },
      eg: {
        title: 'Établissement',
        type: 'string',
        filter: false,
        width: '20%',
        valuePrepareFunction: this.refentielDisplay
      },
      uf: {
        title: 'UF',
        type: 'string',
        filter: false,
        width: '30%',
        valuePrepareFunction: this.refentielDisplay
      },
      metier: {
        title: 'Métier',
        type: 'string',
        filter: false,
        valuePrepareFunction: this.refentielMetierDisplay
      },
      places: {
        title: 'Inscrits\n/ total ',
        type: 'number',
        filter: false,
        width: '5%',
        valuePrepareFunction: this.getPlaces
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(api: ApiService, private windowService: NbWindowService, private router: Router, private route: ActivatedRoute) {
    this.api = api;
   }

  ngOnInit(): void {
    this.search();
  }

  refentielDisplay(cell:any): string {
    
    return `${cell.code} - ${cell.libelle}`;
  }

  refentielMetierDisplay(cell:any): string {
    
    return cell.libelle;
  }

  getPlaces(cell:any, row: any): string {
    // console.log(row);
    
    return `${row.nb_inscription} / ${cell}`;
  }



/*
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    /*for (const propName in changes) {
     const changedProp = changes[propName];
      if(changedProp.currentValue != changedProp.previousValue) {
       this.search();
       break;
      }
    }
   }*/

   async search() {
     console.log('search visites list');
     console.log(this.groupementCode, this.etablissementCode, this.ufCode, this.metierCode);

    
     this.visites = await this.api.getVisites(this.ufCode, this.etablissementCode, this.groupementCode, this.metierCode);
     
     
     this.source.load(this.visites);

   }

   onCustom(event: any) {

    console.log(event.data.id);
   // this.router.navigateByUrl(`/visites/edit/${event.data.id}`);
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
    this.windowService.open(VisiteEditComponent, { title: `Détail de la visite`, context: { visiteId: event.data.id} });
    
  }



}
