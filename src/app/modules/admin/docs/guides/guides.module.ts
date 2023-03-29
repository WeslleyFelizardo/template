import { NgModule } from '@angular/core';
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
import { GuidesComponent } from 'app/modules/admin/docs/guides/guides.component';
import { DirectoryStructureComponent } from 'app/modules/admin/docs/guides/development/directory-structure/directory-structure';
import { ComponentStructureComponent } from 'app/modules/admin/docs/guides/development/component-structure/component-structure';
import { StarterKitComponent } from 'app/modules/admin/docs/guides/development/starter-kit/starter-kit';
import { DeploymentComponent } from 'app/modules/admin/docs/guides/development/deployment/deployment';
import { UpdatingComponent } from 'app/modules/admin/docs/guides/development/updating/updating';
import { ThemeLayoutsComponent } from 'app/modules/admin/docs/guides/customization/theme-layouts/theme-layouts';
import { PageLayoutsComponent } from 'app/modules/admin/docs/guides/customization/page-layouts/page-layouts';
import { TailwindCSSComponent } from 'app/modules/admin/docs/guides/customization/tailwindcss/tailwindcss';
import { ThemingComponent } from 'app/modules/admin/docs/guides/customization/theming/theming';
import { ComponentThemingComponent } from 'app/modules/admin/docs/guides/customization/component-theming/component-theming';
import { SplashScreenCustomizationComponent } from 'app/modules/admin/docs/guides/customization/splash-screen/splash-screen';
import { MultiLanguageCustomizationComponent } from 'app/modules/admin/docs/guides/customization/multi-language/multi-language';
import { JwtComponent } from 'app/modules/admin/docs/guides/authentication/jwt/jwt';
import { guidesRoutes } from 'app/modules/admin/docs/guides/guides.routing';
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

@NgModule({
    declarations: [
        GuidesComponent,
        OverviewComponent,
        SecurityComponent,
        EndpointSpecComponent,
        EndpointRequestComponent,
        DirectoryStructureComponent,
        ComponentStructureComponent,
        StarterKitComponent,
        DeploymentComponent,
        UpdatingComponent,
        ThemeLayoutsComponent,
        PageLayoutsComponent,
        TailwindCSSComponent,
        ThemingComponent,
        ComponentThemingComponent,
        SplashScreenCustomizationComponent,
        MultiLanguageCustomizationComponent,
        JwtComponent
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
