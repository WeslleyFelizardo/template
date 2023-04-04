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
    selector       : 'sign-up',
    templateUrl    : './sign-up.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'sign-up'
})
export class SignUpComponent implements OnInit, OnDestroy
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
        this.auth.dispararSignin();
      }

      onNavigatePricing() {
        this._router.navigate(['./pricing']);
      }
}