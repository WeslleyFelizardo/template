import { Route } from '@angular/router';

import { SecurityComponent } from './getting-started/security/security';
import { EndpointSpecComponent } from './getting-started/endpoint-spec/endpoint-spec';
import { GuidesComponent } from './guides.component';
import { OverviewComponent } from './getting-started/overview/overview';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const guidesRoutes: Route[] = [
    {
        path     : '',
        component: GuidesComponent,
        children : [
            {
                path      : '',
                pathMatch : 'full',
                redirectTo: 'getting-started'
            },
            {
                path    : 'getting-started',
                children: [
                    {
                        path      : '',
                        pathMatch : 'full',
                        redirectTo: 'overview'
                    },
                    {
                        path     : 'overview',
                        component: OverviewComponent
                    },
                    {
                        path     : 'security',
                        component: SecurityComponent
                    }
                ]
            },
            {
                path    : 'endpoints-spec',
                children: [
                    // {
                    //     path      : '',
                    //     pathMatch : 'full',
                    //     redirectTo: 'structure'
                    // },
                    {
                        path     : ':endpoint',
                        component: EndpointSpecComponent
                    }
                ]
            }
        ]
    }
];
