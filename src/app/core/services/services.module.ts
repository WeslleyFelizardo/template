import { NgModule } from '@angular/core';
import { MenuDocsService } from './menu-docs.service';
import { ApimService } from './apim.service';
import { UtilService } from './util.service';

@NgModule({
    imports  : [
        
    ],
    providers: [
        ApimService,
        MenuDocsService,
        UtilService
    ]
})
export class ServicesModule
{
}
