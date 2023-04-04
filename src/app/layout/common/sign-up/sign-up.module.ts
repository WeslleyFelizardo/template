import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { SharedModule } from 'app/shared/shared.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        TranslocoModule
    ],
    exports     : [
        SignUpComponent
    ]
})
export class SignUpModule
{
}
