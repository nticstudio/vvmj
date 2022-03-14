import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';


export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      // NbDummyAuthStrategy.setup({
      //   name: 'email',
      //   delay: 3000,
      // }),
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,

          key: 'token', // this parameter tells where to look for the token
        },
        baseEndpoint: '',
        login: {
          endpoint: '/login',
          method: 'post'
        },
        logout: {
          endpoint: '/logout',
          method: 'post'
        },


      }),
    ],
    forms: {
      login: {
      }
     /* login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },*/
    },
  }).providers || []
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NbAuthModule,
  ],
})

export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    }
  }
}


 
