import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, 
  NbMenuModule, 
  NbUserModule, 
  NbActionsModule,
  NbSearchModule, 
  NbSidebarModule, 
  NbContextMenuModule, 
  NbButtonModule, 
  NbSelectModule, 
  NbIconModule,
  NbThemeModule } from '@nebular/theme';

  import {
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
  } from './pipes';
import {
  FooterComponent,
  HeaderComponent
} from './components';

import {
  OneColumnLayoutComponent
} from './layouts';

import { DEFAULT_THEME } from './styles/theme.default';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];



const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule, ...NB_MODULES
  ],
  exports: [CommonModule, ...COMPONENTS,  ...PIPES],

})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME ],
        ).providers || [],
      ],
    };
  }
}
