import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenIdConnectService } from 'app/core/auth/open-id-connect.service';
import { ApimService } from 'app/core/services/apim.service';
import { ProdutosService } from 'app/core/services/produtos.service';
import _ from 'lodash';
import { BehaviorSubject, finalize, from, Observable, observeOn, of } from 'rxjs';

@Component({
    selector       : 'pricing-modern',
    templateUrl    : './modern.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingModernComponent implements OnInit, AfterViewInit
{
    yearlyBilling: boolean = true;
    public perfilPlanosList: any[];

  perfilDesenvolvedorParceiroLogado: any;
  planosList: any;
  private APP_CADASTRO_USUARIO_URL = "sessions/signup/";
  public carouselTileItems: Array<any>;
  public carouselTileItems$: BehaviorSubject<any> = new BehaviorSubject(
    undefined
  );


  public carouselSubscription = this.carouselTileItems$.asObservable();
  public loading = true;
  public loadingPlanos = true; 
  public perfilSelected: any;
 
  public expandedApis = false;
  recursosPlano: any;
  loginUserLogged = false;
  public planoAtual: string = "";
  active = 1;


  constructor(
    private openIdConnectService: OpenIdConnectService,
    private produtosService: ProdutosService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private matDialog: MatDialog

    //private matDialog: MatDialog,
    //private modalService: NgbModal,
    //private toastr: ToastrService
  ) { 

    
  }


    ngAfterViewInit(): void {
    }

  ngOnInit() {
    this.loadingPlanos = true;

    let me = this;
    this.openIdConnectService.usuarioCarregado$.subscribe(
      (usuarioCarregado) => {
        if (usuarioCarregado) {
          this.loginUserLogged = !!usuarioCarregado;
          this.perfilDesenvolvedorParceiroLogado =
            this.openIdConnectService.isUsuarioDesenvolvedorParceiro();
          if (this.perfilDesenvolvedorParceiroLogado) {
            this.perfilDesenvolvedorParceiroLogado =
              this.openIdConnectService.perfilDesenvolvedorParceiro;
            this.planoAtual =
              this.perfilDesenvolvedorParceiroLogado.perfil +
              " " +
              this.perfilDesenvolvedorParceiroLogado.produto;
          }
        }
      }
    );

    this.produtosService.getProdutosRecursos()
    .finally(() => {
      //this.loadingPlanos = false;
    })
    .then((data) => {
      this.recursosPlano = data;

      this.produtosService.perfilPlanoList$
      .pipe(finalize(() => {
        this.loadingPlanos = false;
      }))
      .subscribe((data) => {
        this.loadingPlanos = true;
        if (!data) {
          return;
        }
  
        this.parseTiles(data);
        this.loadingPlanos = false;
      });
    });


    this.carouselSubscription.subscribe((tiles) => {
      if (!tiles || tiles.length === 0) {
        return;
      }
      me.loading = false;
      me.perfilPlanosList = tiles;
      console.log('dados', me.perfilPlanosList);

      this.onFilterByPerfil(me.perfilPlanosList[0].value);

      this.changeDetector.detectChanges();
    });
  }

  private getAllRecursosPerfil(perfil: string) {
    let recursosPerfil = _.filter(this.recursosPlano, function (recurso) {
      return recurso.plano.match(perfil) ? true : false;
    });
    return recursosPerfil;
  }
  public getCellRecursoPlano(recurso, perfilSelecionado, plano) {

    return recurso.value.some(x => x.plano == `${perfilSelecionado} ${plano}`);
  }
  private planoPossuiRecurso(perfil: string, plano: string) {
    const _exists = _.countBy(perfil, () => true);
    return _exists ? true : false;
  }
  private parseTiles(perfilPlanosList: any[]) {
    // console.log(perfilPlanosList);
    const me = this;
    for (let idxPerfil = 0; idxPerfil < perfilPlanosList.length; idxPerfil++) {
      let perfilRecord;
      perfilRecord = perfilPlanosList[idxPerfil];
      for (let i = 0; i < perfilRecord?.planos.length; i++) {
        const tile = {
          nomeProduto: perfilRecord.planos[i].nomeProduto || "nomeProduto",
          preco: perfilRecord.planos[i].preco || 0,
          recursos: perfilRecord.planos[i].recursos || [],
          features: perfilRecord.planos[i].features || [],
          quantidadeAplicacao:  perfilRecord.planos[i].quantidadeAplicacao,
        };
        perfilRecord.allRecursosPerfil = this.getAllRecursosPerfil(
          perfilRecord.value
        );
        perfilRecord.recursosMap = _.groupBy(
          perfilRecord.allRecursosPerfil,
          (pr) => pr.recurso
        );
        if (!perfilRecord?.tiles) {
          perfilRecord.tiles = [];
          perfilRecord.tiles.push(tile);
        } else {
          perfilRecord.tiles.push(tile);
        }
      }
    }

    //me.perfilPlanosList$ = from(perfilPlanosList);
    me.carouselTileItems$.next(perfilPlanosList);
  }

  registrarUsuarioPlano(perfil: any, plano) {
    if (!!plano) {
      this.router.navigateByUrl(
        `${this.APP_CADASTRO_USUARIO_URL}${plano.nomeProduto}`,
        { state: { perfil: perfil, plano: plano } }
      );
    }
  }

  upgradeUsuarioPlano(perfil, plano, _container: any) {
    // let me = this;
    // let ngbdModalConfirm = this.modalService.open(NgbdModalConfirm, {
    //   windowClass: 'dark-modal',
    //   centered: true,
    // });
    // ngbdModalConfirm.componentInstance.message1 = `Plano atual ${this.planoAtual}`;
    // ngbdModalConfirm.componentInstance.message2 = `Novo plano ${plano.nomeProduto}`;
    // ngbdModalConfirm.componentInstance.title = "Confirmação de novo plano";
    // ngbdModalConfirm.componentInstance.message =
    //   "Clique em confirmar para atualizar o seu plano";

    // ngbdModalConfirm.result.then(
    //   (result) => {
    //     let loadingDlg = this.modalService.open(LoadingDialog, {
    //       centered: true,
    //       beforeDismiss: () => {
    //         if (loadingDlg.componentInstance.loading) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //       },
    //     });
    //     loadingDlg.componentInstance.title = "Aguarde";
    //     loadingDlg.result.then((r)=>{
    //       me.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
    //       me.router.navigate(['/']));
    //     })

    //     const planoProdutoEnum = EProduto[plano.nomeProduto.split(" ")[1] as keyof typeof EProduto];
    //     this.produtosService.subscreverPlano(planoProdutoEnum).subscribe(
    //       (result) => {
    //         loadingDlg.componentInstance.message = "Subscrição realizada";
    //       },
    //       (error) => {
    //         if (error?.error?.errors && !!error?.error?.errors[0]) {
    //           loadingDlg.componentInstance.message = error?.error?.errors[0];
    //         }
    //         loadingDlg.componentInstance.loading = false;
    //       },
    //     );
    //   },
    //   (reason) => { 
    //   }
    // );
  }

  formatPlan(plano: string, perfil: string) {
    return plano.replace(`${perfil} `, '');
  }

  onFilterByPerfil(perfil: string) {
    this.perfilSelected = this.perfilPlanosList.find(x => x.value == perfil);

    console.log('perfil selecionado', this.perfilSelected);

    this.changeDetector.detectChanges();
  }

  onSignup(plano: string, perfil: string): void
    {
        this.router.navigate(['./pages/authentication/sign-up/classic'], { state: { plano: plano , perfil: perfil } });
    }
}
