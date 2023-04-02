import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorDTO } from 'app/core/DTOs/errorDTO';
import { ErrorService } from 'app/core/services/error.service';
import { InserirWebhookDTO, IWebhookConfiguracaoDTO, WebhookParceiroDTO, WebhookService } from 'app/core/services/webhook.service';
import _ from 'lodash';
import { ISchema } from 'ngx-schema-form';
import { finalize } from 'rxjs';

@Component({
    selector       : 'settings-web-hooks',
    templateUrl    : './web-hooks.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsWebHooksComponent implements OnInit, AfterViewInit
{
  webHooksForm: UntypedFormGroup;
  
  public errorWebhookForm: ErrorDTO = new ErrorDTO();
  public sucessWebhookForm: boolean = false;

  public configuracaoParceiroExiste = false;
  public usuarioWebhookConfig: IWebhookConfiguracaoDTO = {
    endpoint: "https://",
    usuario: "",
    senha: "",
    segredo: "",
  } ;

  public loading = true;
  public jsonFormObject: any;
  public webHooksDisponiveis: IWebhooksDisponivelConfiguracaoParceiro[] = [
    {
      idWebhook: 1,
      webhookType: WebhookType.VoyageChange,
      descricao: "VoyageChange",
      userSettings: [],
      fields: [
        {
          name: "servico",
          type: "text",
          title: "Servico",
          value: "",
          properties: {},
        },
        {
          name: "ativo",
          type: "checkbox",
          title: "Ativo", 
          value: "false",
          properties: {},
        },
      ],
    },
  ];

     // The schema that will be used to generate a form
  mySchema: ISchema = {
    properties: {
      email: {
        type: "string",
        description: "email",
        format: "email",
      },
      password: {
        type: "string",
        description: "Password",
      },
      rememberMe: {
        type: "boolean",
        default: false,
        description: "Remember me",
      },
    },
    required: ["email", "password", "rememberMe"],
  };
   public jsonFormValid = false;
  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder,
      private webhookService: WebhookService,
      private _errorService: ErrorService,
      private _changeDetectorRef: ChangeDetectorRef,
  )
  {
  }
  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();  

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
      this.webHooksForm = this._formBuilder.group({
          endpoint: [],
          usuario: [],
          senha: [],
          segredo: []
      });

      let me = this;
      this.loading = true;
      this.loadConfiguracaoEndpointParceiro(me);
  }

  private loadConfiguracaoEndpointParceiro(me: this) {
    me.errorWebhookForm.reset();
    me.webhookService.configuracaoGET()
    .pipe(finalize(() => {
      this._changeDetectorRef.detectChanges();  

      this.loading = false;
      if( this.configuracaoParceiroExiste){        
        this.loadConfiguracaoWebhookParceiro();
      }
    }))
    .subscribe(
      (userStoredConf: IWebhookConfiguracaoDTO) => {    
        if (userStoredConf?.endpoint) {
          me.usuarioWebhookConfig = userStoredConf;
          if (!!me?.usuarioWebhookConfig?.endpoint) {
            this.configuracaoParceiroExiste = true;             
            this.webHooksForm.patchValue(me.usuarioWebhookConfig);
            if(this.webHooksForm.valid){
              // this.tabGroupWebhookIndex = 0;
            }
          }
        }
        // console.log("configuracaoGET:data ", data);
        // console.log("me.usuarioWebhookConfigs ", me.usuarioWebhookConfig);
      }, (error) => {
        this.errorWebhookForm.show(this._errorService.tratarErroHttp(error));
      }
    );
  }

  private loadConfiguracaoWebhookParceiro() {
    const me = this;
    this.loading = true;
    me.webhookService.parceiroGET()
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(
      (configuracaoWebhookUsuario?: any) => {
        if (configuracaoWebhookUsuario) {
          me.webHooksDisponiveis = _.map(
            this.webHooksDisponiveis,
            (webhookDisponivel: any) => {
              if (!webhookDisponivel) {
                return;
              }
              const userConfForWebhookDisponivel = _.countBy(configuracaoWebhookUsuario, (conf) => {
                return conf.idWebhook === webhookDisponivel.idWebhook;
              })
              if (userConfForWebhookDisponivel?.true) {
                const _userSettings = configuracaoWebhookUsuario as WebhookParceiroDTO[];
                this.parseUserSettings(webhookDisponivel, _userSettings);
              }
              return webhookDisponivel;
            }
          );
          // this.tabGroupWebhookIndex = 0;
        }
      }
    );
  }

  parseUserSettings(
    webhookDisponivel: IWebhooksDisponivelConfiguracaoParceiro,
    _userSettings: WebhookParceiroDTO[]
  ) {
    for (let index = 0; index < _userSettings.length; index++) {
      let  configuracaoUsuario = _userSettings[index];
      let  configuracaoUsuarioParametrizacao: WebhookFieldSettings[] = JSON.parse(configuracaoUsuario.parametrizacao);
      
      webhookDisponivel.idWebhookParceiro = configuracaoUsuario.idWebhookParceiro
      
      for (let idxWebhookField = 0; idxWebhookField < webhookDisponivel.fields.length; idxWebhookField++ ) {
        let webHookDisponivelField = webhookDisponivel.fields[
          idxWebhookField
        ] as WebhookFieldSettings;
        let configuracaoUsuarioParametrizacaoField = _.find(configuracaoUsuarioParametrizacao, (paramUse: WebhookFieldSettings )=> {
          return paramUse.name == webHookDisponivelField.name;
        }) 
        
        if (configuracaoUsuarioParametrizacaoField) {
          webHookDisponivelField.value =  configuracaoUsuarioParametrizacaoField.value;
        }
      }
    }
  }

  guardaConfiguracaoWebhookParceiro() { 
    this.errorWebhookForm.reset();
    const me = this;
    const saveObject: any = {};
    let data = this.webHooksForm.value;
    Object.assign(saveObject, data);
   
    this.loading = true;
    if (this.configuracaoParceiroExiste == true) {
      me.webhookService.configuracaoPUT(saveObject)
      .pipe(finalize(() => {
        this.loading = false;
        me._changeDetectorRef.detectChanges();

      }))
      .subscribe(
        (_data: any) => {
          me.sucessWebhookForm = true;
          me._changeDetectorRef.detectChanges();

          me.configuracaoParceiroExiste == true;
          me.usuarioWebhookConfig = data;
          

          setTimeout(function() {
            me.sucessWebhookForm = false;

            me._changeDetectorRef.detectChanges();
          }.bind(me), 5000);

        }, (error) => {
          me.errorWebhookForm.show(this._errorService.tratarErroHttp(error));
        }
      );
    } else {
      me.webhookService.configuracaoPOST(saveObject)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(
        (data: any) => {
          me.sucessWebhookForm = true;
          setTimeout(function() {
            me.sucessWebhookForm = false;
            
          }.bind(me), 5000);

        }
      );
    }
  }
  saveUserWebhookConfig(item: IWebhooksDisponivelConfiguracaoParceiro) {
    
    if (!item.idWebhookParceiro) {
      const data = {
        idWebhook: item.idWebhook,
        parametrizacao: this.WebhookParameterToJson(item),
      };
      this.inserirConfWebhookParceiro(data);
    } else  {
      const data = {
        idWebhook: item.idWebhook,
        idWebhookParceiro: item.idWebhookParceiro,
        parametrizacao: this.WebhookParameterToJson(item),
      };
      this.atualizarConfWebhookParceiro(data);
    }
  }
  WebhookParameterToJson(item: IWebhooksDisponivelConfiguracaoParceiro): string {
    let userSettings: WebhookFieldSettings[] = [];
    for (let index = 0; index < item.fields.length; index++) {
      const element = item.fields[index];
      let userSetting: WebhookFieldSettings = {
        name: element.name,
        title: element.title,
        type: element.type,
        value: element.value,
      };
      userSettings.push(userSetting);
    }
    return JSON.stringify(userSettings);
  }

  public inserirConfWebhookParceiro(item: WebhookParceiroDTO) {
    let me = this;
    let webhootDto = new InserirWebhookDTO({
      ...item,
    });
    this.loading = true;
    me.webhookService.parceiroPOST(webhootDto)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(
      (result) => {
        this.showOperacaoSucesso();
      }
    );
  }

  atualizarConfWebhookParceiro(item: WebhookParceiroDTO) {
    let me = this;
    
    
    me.webhookService.parceiroPUT(item)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(
      (result) => {
        this.showOperacaoSucesso();
      }
    );
  }
  showOperacaoSucesso() { 
    // this.toastService.success('Operação realizado com sucesso');

  }
  
  

}

export enum WebhookType {
  VoyageChange = 1,
}

export interface IWebhooksDisponivelConfiguracaoParceiro {
  idWebhook: number;
  webhookType: WebhookType;
  descricao: string;
  fields?: WebhookFieldSettings[];
  idWebhookParceiro?: number;
  userSettings?: WebhookFieldSettings[];
}

export interface WebhookFieldSettings {
  name: string;
  type: string;
  title: string;
  value?: any;
  validators?: any[];
  properties?: Properties;
}

export interface Properties {}

