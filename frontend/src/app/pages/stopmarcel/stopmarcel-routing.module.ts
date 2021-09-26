import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StopmarcelComponent } from './stopmarcel.component';


const routes: Routes = [{
  path: '',
  component: StopmarcelComponent,
},
{
  path: 'collaborateurs',
  loadChildren: () => import('./collaborateurs/collaborateurs.module')
    .then(m => m.CollaborateursModule),
},
{
  path: 'declarations',
  loadChildren: () => import('./declarations/declarations.module')
    .then(m => m.DeclarationsModule),
},

{
  path: 'entreprises',
  loadChildren: () => import('./entreprises/entreprises.module')
    .then(m => m.EntreprisesModule),
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopmarcelRoutingModule {
}
      