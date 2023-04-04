import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { FuseAlertModule } from "@fuse/components/alert";
import { FuseCardModule } from "@fuse/components/card";
import { TranslocoModule } from "@ngneat/transloco";
import { SharedModule } from "app/shared/shared.module";
import { authenticationRoutes } from "./authentication.routing";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SigninOidcComponent } from "./signin-oidc/signin-oidc.component";

@NgModule({
    declarations: [SignUpComponent, SigninOidcComponent],
    imports: [
        RouterModule.forChild(authenticationRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        //MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        TranslocoModule,
        SharedModule
    ],
    exports: [

    ]
})
export class AuthenticationModule
{
}
