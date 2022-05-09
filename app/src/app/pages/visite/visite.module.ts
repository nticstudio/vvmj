import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisiteListComponent } from './visite-list/visite-list.component';
import { VisiteNewComponent } from './visite-new/visite-new.component';
import { VisiteEditComponent } from './visite-edit/visite-edit.component';
import { VisiteRoutingModule } from './visite-routing.module';
import { VisiteComponent } from './visite.component';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { EtablissementSelectComponent } from './etablissement-select/etablissement-select.component';
import { UniteSelectComponent } from './unite-select/unite-select.component';
import { GroupementSelectComponent } from './groupement-select/groupement-select.component';
import { MetierSelectComponent } from './metier-select/metier-select.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ApercuUserComponent } from '../users/apercu-user/apercu-user.component';
import { CurrentUserComponent } from '../users/current-user/current-user.component';
import { SelectUserComponent } from '../users/select-user/select-user.component';
import { SelectLdapUserComponent } from '../users/select-ldap-user/select-ldap-user.component';



@NgModule({
  declarations: [
    VisiteListComponent,
    VisiteNewComponent,
    VisiteEditComponent,
    VisiteComponent,
    GroupementSelectComponent,
    EtablissementSelectComponent,
    UniteSelectComponent,
    MetierSelectComponent,
    ApercuUserComponent,
    CurrentUserComponent,
    SelectUserComponent,
    SelectLdapUserComponent

  ],
  imports: [
    CommonModule,
    ThemeModule,
    VisiteRoutingModule,
    NbCardModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbAutocompleteModule,    
    NbDatepickerModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
  ]
})
export class VisiteModule { }
