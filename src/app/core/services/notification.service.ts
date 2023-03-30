import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

import { environment } from 'environments/environment';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { BtpNotification } from '../DTOs/btpNotification';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable()
export class NotificationService {

    private subject = new Subject<BtpNotification>();
    private fixarNaRota = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.fixarNaRota) {
                    this.fixarNaRota = false;
                } else {
                    this.limparNotificacao();
                }
            }
        });
    }

    obterNotificacao(): Observable<any> {
        return this.subject.asObservable();
    }

    notificar(mensagem: string, options?: any, fixarNaTela: boolean = true, fixarNaRota: boolean = true, type: NotificationType = NotificationType.DEFAULT) {

        if (!environment.production && !environment.qas ) {
            switch (type) {
                case NotificationType.ERROR:
                    console.groupCollapsed('Notificação de Erro');
                    console.log('Uma notificação de erro foi emitida por', this.router.url);
                    console.trace(mensagem);
                    console.groupEnd();
                    break;
                case NotificationType.SUCCESS:
                    console.groupCollapsed('Notificação de Sucesso');
                    console.log('Uma notificação de sucesso foi emitida por', this.router.url);
                    console.log(mensagem);
                    console.groupEnd();
                    break;
                default:
                    console.groupCollapsed('Notificação Padrão');
                    console.log('Uma notificação foi emitida por', this.router.url);
                    console.log(mensagem);
                    console.groupEnd();
                    break;
            }
        }

        this.fixarNaRota = fixarNaRota;

        const _options: MatSnackBarConfig = { panelClass: 'snackbar-generico', verticalPosition: 'bottom', horizontalPosition: 'right' };
        if (!fixarNaTela) { _options.duration = 4000; }

        Object.assign(_options, options);

        if (mensagem.length > 200) {
          mensagem = mensagem.substring(0, 197) + '...';
        }

        this.subject.next(<BtpNotification>{ mensagem: mensagem, fixo: fixarNaTela, options: _options});
    }

    notificarInfo(mensagem: string, options?: any, fixarNaTela: boolean = true, fixarNaRota: boolean = false, mensagemBotao = '') {
        const _options: any = { panelClass: 'snackbar-info' };
        Object.assign(_options, options);

        this.notificar(mensagem, _options, fixarNaTela, fixarNaRota, NotificationType.INFO);
    }

    notificarSucesso(mensagem: string, options?: any, fixarNaTela: boolean = false, fixarNaRota: boolean = false, mensagemBotao = '') { 
        const _options: any = { panelClass: 'snackbar-sucesso' };
        Object.assign(_options, options);

        this.notificar(mensagem, _options, fixarNaTela, fixarNaRota, NotificationType.SUCCESS);
    }

    notificarErro(mensagem: string, options?: any, fixarNaTela: boolean = true, fixarNaRota: boolean = false, mensagemBotao = '') {
        const _options: any = { panelClass: 'snackbar-erro' };
        Object.assign(_options, options);

        this.notificar(mensagem, _options, fixarNaTela, fixarNaRota, NotificationType.ERROR);
    }

    limparNotificacao() {
        //this.subject.next();
    }

}

