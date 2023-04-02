import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorDTO } from 'app/core/DTOs/errorDTO';
import { ErrorService } from 'app/core/services/error.service';
import { ProfileDevParceiroService } from 'app/core/user/profile-dev-parceiro.service';
import { finalize } from 'rxjs';

@Component({
    selector       : 'settings-api-keys',
    templateUrl    : './api-keys.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsApiKeysComponent implements OnInit
{
    userApiSubscriptionList: any; 
    public loading = false;
    public appName: string = '';
    public cadastroSucesso: boolean = false;
    public errorSubscriptionList: ErrorDTO = new ErrorDTO();
     
    /**
     * Constructor
     */

    constructor(
        public profileService: ProfileDevParceiroService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _errorService: ErrorService
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
        this.loadUserSubscriptions();
        this._changeDetectorRef.detectChanges();
    }

    addApp() { 
        const me = this;
        const nomeApp = this.appName;
        this.loading = true;
        this.profileService.inserirAppDevParceiro(nomeApp)
        .pipe(finalize(() => {
          this.loading = false;
          
        }))
        .subscribe(data => { 
          this.appName = '';
          me.cadastroSucesso = true;
          me._changeDetectorRef.detectChanges();

          this.loadUserSubscriptions();  

          setTimeout(function() {
            me.cadastroSucesso = false;
            
            me._changeDetectorRef.detectChanges();
          }.bind(me), 5000);
        });
      }

    private loadUserSubscriptions() {
        this.errorSubscriptionList.reset();
        this._changeDetectorRef.detectChanges();

        const me = this;
        this.loading = true; 
        this.profileService.getSusbscriptionKeys()
        .pipe(finalize(() => {
          this.loading = false;

          this._changeDetectorRef.detectChanges();
        }))
        .subscribe((keyList) => { 
          if (keyList) {
            me.userApiSubscriptionList = keyList;
          }},
          (error) => {
            this.errorSubscriptionList.show(this._errorService.tratarErroHttp(error));
          }
        );
      }
}
