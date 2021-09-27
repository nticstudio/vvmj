import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ThemeModule {

  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule
    }
  }
}
