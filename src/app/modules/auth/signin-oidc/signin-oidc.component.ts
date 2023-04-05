import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenIdConnectService } from 'app/core/auth/open-id-connect.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector     : 'app-signin-oidc',
    templateUrl: './signin-oidc.component.html',
    styleUrls: ['./signin-oidc.component.scss'],
    //encapsulation: ViewEncapsulation.None,
    //animations   : fuseAnimations
})
export class SigninOidcComponent implements OnInit
{
  private inscricao: Subscription;

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  constructor(
    private openIdConnectService: OpenIdConnectService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    console.log('sign in');
    this.inscricao = this.openIdConnectService.usuarioCarregado$.subscribe(
      usuarioCarregado => {
        if (usuarioCarregado) {
          const usuarioLogado = this.openIdConnectService.usuario;

          this.router.navigate(['/']);
        }
      }

    );

    this.openIdConnectService.gerenciarCallback();
  }
}
