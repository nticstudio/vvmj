import { Component } from '@angular/core';
import { NbAuthResult, NbLoginComponent, NbLogoutComponent } from '@nebular/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends  NbLogoutComponent   {

 // window.location.reload();

 logout(strategy: string): void {
  this.service.logout(strategy).subscribe((result: NbAuthResult) => {

    const redirect = result.getRedirect();
   
    if(result.isSuccess()) {
      
      
      setTimeout(() => {
         this.router.navigateByUrl(redirect);

        setTimeout(() => {
          return  window.location.reload();
         }, this.redirectDelay);
       
     
         
      }, this.redirectDelay);
    }


  });
}
 
//  login(): void {
//   this.errors = [];
//   this.messages = [];
//   this.submitted = true;

//   this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
//     this.submitted = false;

//     if (result.isSuccess()) {
//       this.messages = result.getMessages();
//     } else {
//       this.errors = result.getErrors();
//     }

//     const redirect = result.getRedirect();
   
//     if(result.isSuccess()) {
      
      
//       setTimeout(() => {
//          this.router.navigateByUrl(redirect);

//         setTimeout(() => {
//           return  window.location.reload();
//          }, this.redirectDelay);
       
     
         
//       }, this.redirectDelay);
          
     
//     }

//     console.log('must redirect');
//     this.cd.detectChanges();
//   });
// }


}
