import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, NgForm } from '@angular/forms';


import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { 
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule
} from '@nebular/theme';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ThemeModule,
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbCardModule
  ]
})
export class AuthModule { }
