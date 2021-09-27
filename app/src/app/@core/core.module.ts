import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    }
  }
}


 
