import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { User, UserManager } from "oidc-client";
import { ReplaySubject } from "rxjs";
import { IDesenvolvedorParceiroInformacoes } from "../services/apim.service";
import { ProfileDevParceiroService } from "../user/profile-dev-parceiro.service";

@Injectable()
export class OpenIdConnectService {
  private gerenciadorUsuario: UserManager = new UserManager(
    environment.oidcSettings
  );
   private usuarioAtual: User ;

  public perfilDesenvolvedorParceiro: IDesenvolvedorParceiroInformacoes = undefined;

  usuarioCarregado$ = new ReplaySubject<boolean>(1);


  constructor(
    private router: Router,
    private http: HttpClient,
    public devParceiroService: ProfileDevParceiroService
  ) {
    this.gerenciadorUsuario.clearStaleState();

    // this.gerenciadorUsuario.getUser().then(user => (this.usuarioAtual = user));

    // this.usuarioAtual = null;
    // this.usuarioCarregado$.next(false);
    // this.usuarioCarregado$.next(true);

    this.gerenciadorUsuario.events.addUserLoaded((usuario) => { 

      if (!environment.production) {
        console.log("Usuario carregado.", usuario);

      }
      // Carregar as urls de todas as telas que o user tem acesso
      this.usuarioAtual = usuario;
      // console.log("Token - " + new Date().toDateString().toString(), usuario);
      // console.log("usuário");
      this.devParceiroService.getDevParceiroPerfil().subscribe(
        (data) => {
          if (data && !!data?.idDesenvolvedorParceiro) {
            this.perfilDesenvolvedorParceiro = data;
          }          
        },
        (error) => {
          this.perfilDesenvolvedorParceiro = undefined;         
        },
        ()=>{
          this.usuarioCarregado$.next(true);
        }
      );
    });

    this.gerenciadorUsuario.events.addUserUnloaded(() => {
      if (!environment.production) {
        // console.log('Usuario descarregado');
      }

      sessionStorage.removeItem("Acessos");

      this.usuarioAtual = null;
      this.usuarioCarregado$.next(false);
    });

    this.gerenciadorUsuario.events.addSilentRenewError(() => {
      // console.log('Erro ao fazer o refresh do token');
 
      this.dispararSignOut();
    });
  }
 
  dispararSignin(): void {
    this.gerenciadorUsuario.signinRedirect().then(function () {
      
      if (!environment.production) {
         console.log('Redirecionamento para a signin disparado.');
      }
    });
  }

  dispararSignOut(): void {
    this.gerenciadorUsuario.signoutRedirect().then(function (resposta) {
      // console.log("deslogado");
      if (!environment.production) {
        // console.log("Redirecionamento para sign out disparado.", resposta);
      }
    });
  }

  gerenciarCallback(): void { 
    // window.location.hash = decodeURIComponent(window.location.hash);
    console.log('Inicio do callback apos refresh da tela ou signin');
    // this.carregarSitemas$.next(true);

    // this.gerenciadorUsuario.getUser().then(user => {
    // if (!user) {
    this.gerenciadorUsuario
      .signinRedirectCallback()
      .then(function (usuario) {
        
        if (!environment.production) {
          console.log('Callback manuseado após signin com sucesso.', usuario);
        }
      })
      .catch((err) => {
        console.error('Erroooooooor', err);
        this.router.navigate([""]);
      });
    // }''

    // this.usuarioCarregado$.next(true);

    // this.router.navigate(['./sistemas']);
    // });
  }

  gerenciarSilentCallback() {
    const self = this; 
    this.gerenciadorUsuario.signinSilentCallback().then(function () { 
      self.gerenciadorUsuario.getUser().then((user) => {
        
        self.usuarioAtual = user;
      });
    });
  }

  public isUsuarioDesenvolvedorParceiro() {
    return !!this.perfilDesenvolvedorParceiro?.idDesenvolvedorParceiro;
  }

  public isUsuarioDesenvolvedorBTP(){
    !!this.perfilDesenvolvedorParceiro?.desenvolvedorInternoBtp
  }

  get usuarioDisponivel(): boolean {
    return this.usuarioAtual != null;
  }
  get usuario(): User {
    return this.usuarioAtual;
  }
}
