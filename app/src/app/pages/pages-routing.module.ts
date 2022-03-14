import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: HomepageComponent,
    },
    {
      path: 'visites',
      loadChildren: () => import('./visite/visite.module')
        .then(m => m.VisiteModule),
    },
    {
      path: 'inscription',
      loadChildren: () => import('./inscription/inscription.module')
        .then(m => m.InscriptionModule),
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'admin',
      component: AdminComponent,
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(m => m.AuthModule)
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
