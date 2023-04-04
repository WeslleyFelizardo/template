import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ErrorDTO } from 'app/core/DTOs/errorDTO';
import { EPerfilDesenvolvedor, EProduto } from 'app/core/services/apim.service';
import { ErrorService } from 'app/core/services/error.service';
import { ProfileDevParceiroService } from 'app/core/user/profile-dev-parceiro.service';

@Component({
    selector     : 'sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignUpComponent implements OnInit
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
    public cadastroErro: ErrorDTO = new ErrorDTO();

    _senhaConfirmaValidatorFn;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private serviceProfileDevParceiro: ProfileDevParceiroService,
        private _router: Router,
        private _location: Location,
        private _errorService: ErrorService
    )
    {
      const params = this._location.getState();
      this.planoSelecionado = params['plano'];
      this.perfilSelecionado = params['perfil'];
      console.log(this.planoSelecionado);
      console.log(this.perfilSelecionado);
      this._senhaConfirmaValidatorFn = this.senhaConfirmaValidatorFn.bind(this);

       
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
        const me = this;

        this.cadastroErro.reset();
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

                setTimeout(function() {
                  me.cadastroSucesso = false;
                  
                }.bind(me), 5000);

              }, (error) => {
                this.cadastroErro.show(this._errorService.tratarErroHttp(error))
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
