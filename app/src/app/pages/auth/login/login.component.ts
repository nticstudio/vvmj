import { Component } from '@angular/core';
import { NbAuthResult, NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent  {

 // window.location.reload();

 loading = false;

 
 async login(): Promise<void> {
  this.errors = [];
  this.messages = [];
  this.submitted = true;

   this.loading = true;

  await this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    this.submitted = false;

    if (result.isSuccess()) {
      this.messages = result.getMessages();
    } else {
      this.errors = result.getErrors();
    }

    const redirect = result.getRedirect();
   
    if(result.isSuccess()) {
      
      
      setTimeout(() => {
         this.router.navigateByUrl(redirect);

        setTimeout(() => {
          return  window.location.reload();
         }, this.redirectDelay);
       
     
         
      }, this.redirectDelay);
          
     
    }

    this.loading = false;

    console.log('must redirect');
    this.cd.detectChanges();
  });
}


}
