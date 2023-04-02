import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorService {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  tratarErroHttp(error: HttpErrorResponse) {
    let mensagemErro = '';

    if (error.status === 0) {
      mensagemErro = 'Não foi possível se comunicar com o servidor';
    } else if (error.status >= 400 && error.status < 500) {
      mensagemErro = error.error.errors[0];
    } else if (error.status >= 500 && error.status < 600) {
      if (error.status === 502) { mensagemErro = 'Não foi possível se comunicar com o servidor'; }
      mensagemErro = error.error.errors[0];
    }

    return mensagemErro;
    
  }

  tratarErroHttpComRetorno(error: string, route: ActivatedRoute) {
    // this.tratarErroHttp(error);
    this.router.navigate(['../'], { relativeTo: route });
  }

  tratarErroBlob(err: any) {
    if (!err || !err.error) {
      return;
    }
    const reader = new FileReader();
    let errorMessage: any;
    const self = this;

    reader.onload = () => {
      try {
        const unsparsedString = JSON.stringify(reader.result);
        errorMessage = JSON.parse(unsparsedString);
        if(!!errorMessage){
          self.notificationService.notificarInfo(errorMessage);
        }
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(err.error);
  }

}
