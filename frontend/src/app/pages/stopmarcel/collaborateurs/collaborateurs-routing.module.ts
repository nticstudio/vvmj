import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborateursComponent } from './collaborateurs.component';
import { CollaborateursListComponent } from './collaborateurs-list/collaborateurs-list.component';
import { CollaborateursDetailComponent } from './collaborateurs-detail/collaborateurs-detail.component';
import { CollaborateursNewComponent } from './collaborateurs-new/collaborateurs-new.component';


const routes: Routes = [{
  path: '',
  component: CollaborateursComponent,
  children: [
    {
      path: 'list',
      component: CollaborateursListComponent,
    },
    {
      path: 'new',
      component: CollaborateursNewComponent,
    },
    {
      path: 'detail',
      component: CollaborateursDetailComponent,
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaborateursRoutingModule {
}
