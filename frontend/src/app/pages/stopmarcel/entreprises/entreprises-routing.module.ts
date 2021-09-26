import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntreprisesComponent } from './entreprises.component';
import { EntreprisesListComponent } from './entreprises-list/entreprises-list.component';
import { EntreprisesDetailComponent } from './entreprises-detail/entreprises-detail.component';
import { EntreprisesRegisterComponent } from './entreprises-register/entreprises-register.component';


const routes: Routes = [{
  path: '',
  component: EntreprisesComponent,
  children: [
    {
      path: 'list',
      component: EntreprisesListComponent,
    },
    {
      path: 'register',
      component: EntreprisesRegisterComponent,
    },
    {
      path: 'detail',
      component: EntreprisesDetailComponent,
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntreprisesRoutingModule {
}
