import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { PricingComponent } from './pricing.component';
import { pricingRoutes } from './pricing.routing';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
        PricingComponent
    ],
    imports     : [
        RouterModule.forChild(pricingRoutes),
        MatButtonModule,
        MatIconModule,
        FuseCardModule,
        TranslocoModule,
        SharedModule
    ]
})
export class PricingModule
{
}
