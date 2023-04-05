import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { OpenIdConnectService } from '../open-id-connect.service';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _auth: OpenIdConnectService
    )
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let accessToken = sessionStorage.getItem(`oidc.user:${environment.oidcSettings.authority}:btp_portal_desenvolvedor`)
        
        if (this._auth.usuarioDisponivel || accessToken) {
            
            return true;
        }
        else {
            this._auth.dispararSignin();
            return false;
        }
    }
}
