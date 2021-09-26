import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { StopmarcelComponent } from './stopmarcel/stopmarcel.component';
import { DeclarationsComponent } from './stopmarcel/declarations/declarations.component';
import { CollaborateursComponent } from './stopmarcel/collaborateurs/collaborateurs.component';
import { ReferentsComponent } from './stopmarcel/referents/referents.component';
import { EntreprisesComponent } from './stopmarcel/entreprises/entreprises.component';
import { StatistiquesComponent } from './stopmarcel/statistiques/statistiques.component';
import { CollaborateursListComponent } from './stopmarcel/collaborateurs/collaborateurs-list/collaborateurs-list.component';
import { CollaborateursDetailComponent } from './stopmarcel/collaborateurs/collaborateurs-detail/collaborateurs-detail.component';
import { CollaborateursNewComponent } from './stopmarcel/collaborateurs/collaborateurs-new/collaborateurs-new.component';
import { DeclarationsListComponent } from './stopmarcel/declarations/declarations-list/declarations-list.component';
import { DeclarationsViewComponent } from './stopmarcel/declarations/declarations-view/declarations-view.component';
import { DeclarationsNewComponent } from './stopmarcel/declarations/declarations-new/declarations-new.component';
import { DeclarationsDetailComponent } from './stopmarcel/declarations/declarations-detail/declarations-detail.component';
import { EntreprisesDetailComponent } from './stopmarcel/entreprises/entreprises-detail/entreprises-detail.component';
import { EntreprisesRegisterComponent } from './stopmarcel/entreprises/entreprises-register/entreprises-register.component';
import { EntreprisesListComponent } from './stopmarcel/entreprises/entreprises-list/entreprises-list.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    StopmarcelComponent,
    DeclarationsComponent,
    CollaborateursComponent,
    ReferentsComponent,
    EntreprisesComponent,
    StatistiquesComponent,
    CollaborateursListComponent,
    CollaborateursDetailComponent,
    CollaborateursNewComponent,
    DeclarationsListComponent,
    DeclarationsViewComponent,
    DeclarationsNewComponent,
    DeclarationsDetailComponent,
    EntreprisesDetailComponent,
    EntreprisesRegisterComponent,
    EntreprisesListComponent,
  ],
})
export class PagesModule {
}
