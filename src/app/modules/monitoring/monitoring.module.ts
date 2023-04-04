import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MonitoringComponent } from './monitoring.component';
import { monitoringRoutes } from './monitoring.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogsWebhooksComponent } from './logs-webhooks/logs-webhooks.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { PayloadViewerComponent } from './logs-webhooks/payload-viewer/payload-viewer.compoent';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
    declarations: [
        MonitoringComponent, LogsWebhooksComponent, PayloadViewerComponent
    ],
    imports     : [
        RouterModule.forChild(monitoringRoutes),
        MatButtonModule,
        FuseCardModule,
        TranslocoModule,
        SharedModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatSelectModule,
        MatDialogModule,
        NgxJsonViewerModule
    ]
})
export class MonitoringModule
{
}
