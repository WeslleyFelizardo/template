import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsApiKeysComponent } from './api-keys/api-keys.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { SettingsWebHooksComponent } from './web-hooks/web-hooks.component';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routing';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsApiKeysComponent,
        SettingsWebHooksComponent
    ],
    imports     : [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        MatTabsModule,
        MatDividerModule,
        MatExpansionModule,
        FormsModule,
        TranslocoModule
    ]
})
export class SettingsModule
{
}
