import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { EPerfilDesenvolvedor, EProduto } from 'app/core/services/apim.service';
import { NotificationService } from 'app/core/services/notification.service';
import { ProfileDevParceiroService } from 'app/core/user/profile-dev-parceiro.service';

@Component({
    selector     : 'sign-up-classic',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignUpClassicComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    planoSelecionado: string = '';
    perfilSelecionado: string = ''; 
    public cadastroSucesso: boolean = false;

    _senhaConfirmaValidatorFn;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private serviceProfileDevParceiro: ProfileDevParceiroService,
        private _notificacao: NotificationService,
        private _router: Router
    )
    {
        this._senhaConfirmaValidatorFn = this.senhaConfirmaValidatorFn.bind(this);

        const params = this._router.getCurrentNavigation().extras.state; 
        this.planoSelecionado = params.plano;
        this.perfilSelecionado = params.perfil;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                nome      : ['', Validators.required],
                sobrenome      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                confirmacaoEmail     : ['', [Validators.required, Validators.email]],
                senha  : ['', Validators.required],
                confirmacaoSenha  : ['', Validators.required],
                empresa   : ['', Validators.required]
          }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signUp(): void
    {

        const perfil: EPerfilDesenvolvedor =
        EPerfilDesenvolvedor[
          this.perfilSelecionado as keyof typeof EPerfilDesenvolvedor
        ];
      const planoProduto: EProduto =
        EProduto[this.planoSelecionado as keyof typeof EProduto];

        if (!this.signUpForm.valid)
            return;

        const valueForm = this.signUpForm.value;
        valueForm.perfil = perfil;
        valueForm.plano = planoProduto;

        this.serviceProfileDevParceiro
            .inserirDesenvolvedorParceiro(valueForm)
            .subscribe(
              async (data: any) => {
                this.cadastroSucesso = true;
                this.signUpForm.value({});
              }
            );  
    }

    senhaConfirmaValidatorFn(control: FormControl) {
        try {
            console.log('validate senha');
          const senhaConfirmacao = control.value;
          const isValid =
            senhaConfirmacao === this.signUpForm.controls.senha.value;
          if (!isValid) {
            return [{ senhaConfirmacao: 'senha não é igual' }];
          }
        } catch (error) {
          return [{ senhaConfirmacao: 'senha não é igual' }];
        }
        return [true];
      }
    
      senhaStrengthValidatorFn(control: FormControl) {
        const password = control.value;
        const length = password.length;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        if (
          length >= 8 &&
          hasUppercase &&
          hasLowercase &&
          hasNumber &&
          hasSpecialChar
        ) {
          return [true];
        } else {
          return [{ senhaFraca: 'senha fraca' }];
        }
      }
}
