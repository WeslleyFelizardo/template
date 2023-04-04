import { Route } from '@angular/router';
import { LogsWebhooksComponent } from './logs-webhooks/logs-webhooks.component';
import { MonitoringComponent } from './monitoring.component';

export const monitoringRoutes: Route[] = [
    {
        path     : '',
        children : [
            {
                path      : '',
                pathMatch : 'full',
                redirectTo: 'logs-webhooks'
            },
            {
                path    : 'logs-webhooks',
                component: LogsWebhooksComponent
            }
        ]
    }
];
