import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule  } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminComponent } from './admin/admin.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SelectLdapUserComponent } from './users/select-ldap-user/select-ldap-user.component';
import { VisiteComponent } from './visite/visite.component';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [
    PagesComponent,
    HomepageComponent,
    DashboardComponent,
    AdminComponent,
     ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    FormsModule,
    NbIconModule,
    NbEvaIconsModule,NbFormFieldModule
    ]
})
export class PagesModule { }
