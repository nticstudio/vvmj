import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisiteComponent } from './visite.component';
import { VisiteListComponent } from './visite-list/visite-list.component';
import { Routes, RouterModule } from '@angular/router';
import { VisiteNewComponent } from './visite-new/visite-new.component';
import { VisiteEditComponent } from './visite-edit/visite-edit.component';



const routes: Routes = [
  { path: '',
      component: VisiteComponent
    },
  {
    path: 'edit',
    component: VisiteEditComponent
  },
    
    {
      path: 'list',
      component: VisiteListComponent,
    },
    {
      path: 'propose',
      component: VisiteNewComponent
    },
    {
      path: 'edit/:id',
      component: VisiteEditComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisiteRoutingModule { }
