import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { OpenIdConnectService } from './open-id-connect.service';
import { ErrorsHandler } from '../handlers/errorhandler';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        OpenIdConnectService,
        AuthService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule
{
}
