import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ApercuUserComponent } from './apercu-user/apercu-user.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SelectLdapUserComponent } from './select-ldap-user/select-ldap-user.component';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from 'src/app/@theme/theme.module';



@NgModule({
  declarations: [
    /* CurrentUserComponent,
    ApercuUserComponent,
   SelectUserComponent,
    SelectLdapUserComponent*/
  ],
  imports: [   
    CommonModule,
    ThemeModule,
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
    NbIconModule,
    NbEvaIconsModule,NbFormFieldModule   
  ]
})
export class UsersModule { }
