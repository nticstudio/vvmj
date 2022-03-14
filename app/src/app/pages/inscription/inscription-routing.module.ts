import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';
import { InscriptionComponent } from './inscription.component';



const routes: Routes = [{
  path: '',
  component: InscriptionComponent,
  children: [
    {
      path: '',
      component: InscriptionListComponent,
    },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule { }
