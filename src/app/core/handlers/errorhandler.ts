import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { environment } from 'environments/environment';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const notificationService = this.injector.get(NotificationService);
    const errorService = this.injector.get(ErrorService);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return notificationService.notificarInfo('Você está offline!');
      } else {
        errorService.tratarErroHttp(error);
      }
    } else {
      if (!environment.production) {
        console.error('Erro: ', error);
      }
    }

  }
}
