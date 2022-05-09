import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ApercuUserComponent } from './apercu-user/apercu-user.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SelectLdapUserComponent } from './select-ldap-user/select-ldap-user.component';



@NgModule({
  declarations: [
    CurrentUserComponent,
    ApercuUserComponent,
    SelectUserComponent,
    SelectLdapUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
