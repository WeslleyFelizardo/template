import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { SecurityComponent } from './getting-started/security/security';
import { MarkdownModule } from 'ngx-markdown';
import { LayoutModule } from 'app/layout/layout.module';
import { OverviewComponent } from './getting-started/overview/overview';
import { CoreModule } from 'app/core/core.module';
import { ServicesModule } from 'app/core/services/services.module';
import { EndpointSpecComponent } from './getting-started/endpoint-spec/endpoint-spec';
import { MatTabsModule } from '@angular/material/tabs';
import { EndpointRequestComponent } from './getting-started/endpoint-spec/components/endpoint-request/endpoint-request';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { GuidesComponent } from './guides.component';
import { guidesRoutes } from './guides.routing';

@NgModule({
    declarations: [
        GuidesComponent,
        OverviewComponent,
        SecurityComponent,
        EndpointSpecComponent,
        EndpointRequestComponent
    ],
    imports     : [
        RouterModule.forChild(guidesRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTreeModule,
        FuseHighlightModule,
        FuseAlertModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        SharedModule,
        LayoutModule,
        MarkdownModule.forChild(),
        ServicesModule,
        MatTabsModule,
        MatDividerModule,
        MatExpansionModule
    ]
})
export class GuidesModule
{
}
