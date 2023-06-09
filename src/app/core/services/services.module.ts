import { NgModule } from '@angular/core';
import { MenuDocsService } from './menu-docs.service';
import { ApimService } from './apim.service';
import { UtilService } from './util.service';
import { NotificationService } from './notification.service';
import { ErrorService } from './error.service';
import { WebhookService } from './webhook.service';

@NgModule({
    imports  : [
        
    ],
    providers: [
        ApimService,
        MenuDocsService,
        UtilService,
        NotificationService,
        ErrorService,
        WebhookService
    ]
})
export class ServicesModule
{
}
