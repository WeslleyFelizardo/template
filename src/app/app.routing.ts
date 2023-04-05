import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

   
    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule), canActivate: [NoAuthGuard]},
            {path: 'pricing', loadChildren: () => import('app/modules/pricing/pricing.module').then(m => m.PricingModule), canActivate: [NoAuthGuard]},

        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'authentication', 
                loadChildren: () => import('app/modules/auth/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },

    // Admin routes
    {
        path: '',
        //canMatch: [AuthGuard],
    
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Documentation
            {path: 'docs', children: [

                // Changelog
                // Guides
                {path: 'guides', loadChildren: () => import('app/modules/docs/guides/guides.module').then(m => m.GuidesModule), canActivate: [NoAuthGuard]}
            ]},

            // Settings
            {path: 'settings', loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard]},

            {path: 'monitoring', children: [

                // Changelog
                // Guides
                {path: '', loadChildren: () => import('app/modules/monitoring/monitoring.module').then(m => m.MonitoringModule), canActivate: [AuthGuard]}
            ]},
            
            // 404 & Catch all
            // {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ],

    }
];
