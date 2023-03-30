import { ErrorHandler, NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NguCarouselModule } from '@ngu/carousel';
import { ErrorsHandler } from './core/handlers/errorhandler';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        MarkdownModule.forRoot({
            sanitize: SecurityContext.NONE,
            markedOptions: {
              provide: MarkedOptions,
              useValue: { 
               gfm: false,
               breaks: false,
               pedantic: false,
               smartLists: true,
               smartypants: true,
             },
           },
         }),
    ],
    providers: [
        { provide: ErrorHandler, useClass: ErrorsHandler }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
