import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
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

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private serviceProfileDevParceiro: ProfileDevParceiroService,
        private _notificacao: NotificationService
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
        //this._notificacao.notificar('teste');
        this._notificacao.notificarSucesso('sucesso');
        this._notificacao.notificarErro('erro');
        this._notificacao.notificarInfo('info');
        // Create the form
        this.signUpForm = this._formBuilder.group({
                nome      : ['', Validators.required],
                sobrenome      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                confirmacaoEmail     : ['', [Validators.required, Validators.email]],
                senha  : ['', Validators.required],
                confirmacaoSenha  : ['', Validators.required],
                empresa   : ['']
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
        const saveObject = {
            nome: this.signUpForm['nome'],
            sobrenome: this.signUpForm['sobrenome'],
            emailCorporativo: this.signUpForm['email'],
            senha: this.signUpForm['senha'],
            confirmacaoSenha: this.signUpForm['senhaConfirmacao'],
            empresa: this.signUpForm['nomeEmpresa'],
            perfil: this.signUpForm['perfil'],
            plano: this.signUpForm['plano'],
          };

          this.serviceProfileDevParceiro
            .inserirDesenvolvedorParceiro(saveObject)
            .subscribe(
              async (data: any) => {
                        
              },
              (err) => {
               console.log(err);
              }
            );
    }
}
