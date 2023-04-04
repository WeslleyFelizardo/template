import { Route } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';


export const authenticationRoutes: Route[] = [
    {
        path     : '',
        children : [
            {
                path      : '',
                pathMatch : 'full',
                redirectTo: 'sign-in'
            },
            {
                path    : 'sign-in',
                component: SigninOidcComponent
            },
            {
                path    : 'sign-up',
                component: SignUpComponent
            }
        ]
    }
];
