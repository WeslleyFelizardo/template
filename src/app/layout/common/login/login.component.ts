import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import { Router } from '@angular/router';
import { Layout } from 'app/layout/layout.types';
import { OpenIdConnectService } from 'app/core/auth/open-id-connect.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'login',
    templateUrl    : './login.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'login'
})
export class LoginComponent implements OnInit, OnDestroy
{
    
    
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        public auth: OpenIdConnectService,
        private _changeDetectorRef: ChangeDetectorRef, 
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    signIn() {
        // this.router.navigateByUrl(`/sessions/profile/account-details`);
        this.auth.dispararSignin();
        //this.auth.signIn({email: 'hughes.brian@company.com', password: 'admin'});
      }
}