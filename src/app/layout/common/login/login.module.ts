import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        TranslocoModule
    ],
    exports     : [
        LoginComponent
    ]
})
export class LoginModule
{
}
