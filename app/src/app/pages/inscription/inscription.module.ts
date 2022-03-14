import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';
import { InscriptionNewComponent } from './inscription-new/inscription-new.component';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';



@NgModule({
  declarations: [
    InscriptionListComponent,
    InscriptionNewComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
