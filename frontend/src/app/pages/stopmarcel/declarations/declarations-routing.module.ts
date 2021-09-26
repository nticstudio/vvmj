import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationsComponent } from './declarations.component';
import { DeclarationsListComponent } from './declarations-list/declarations-list.component';
import { DeclarationsNewComponent } from './declarations-new/declarations-new.component';
import { DeclarationsDetailComponent } from './declarations-detail/declarations-detail.component';


const routes: Routes = [{
  path: '',
  component: DeclarationsComponent,
  children: [
    {
      path: 'list',
      component: DeclarationsListComponent,
    },
    {
      path: 'new',
      component: DeclarationsNewComponent,
    },
    {
      path: 'detail',
      component: DeclarationsDetailComponent,
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationsRoutingModule {
}
