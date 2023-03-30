import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorService {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  tratarErroHttp(error: HttpErrorResponse) {
    console.log('handler erro')
    if (error.status === 0) {
      return this.notificationService.notificarErro('Não foi possível se comunicar com o servidor');
    } else if (error.status >= 400 && error.status < 500) {
      return this.notificationService.notificarInfo(error.error);
    } else if (error.status >= 500 && error.status < 600) {
      if (error.status === 502) { return this.notificationService.notificarErro('Não foi possível se comunicar com o servidor'); }
      return this.notificationService.notificarErro(error.error);
    }
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
