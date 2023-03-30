import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BtpNotification } from './core/DTOs/btpNotification';
import { NotificationService } from './core/services/notification.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    /**
     * Constructor
     */
    constructor(private notificationService: NotificationService,
        private zone: NgZone,
        public snackBar: MatSnackBar

        )
    {
    }

    ngOnInit(): void {
        this.notificationService.obterNotificacao().subscribe((notificacao: BtpNotification) => {
            console.log('appComponent')
            if (notificacao) {
              if (notificacao.fixo) {
                this.zone.run(() => {
                  this.snackBar.open(notificacao.mensagem, 'Dispensar', notificacao.options);
                });
              } else {
                this.zone.run(() => {
                  this.snackBar.open(notificacao.mensagem, '', notificacao.options);
                });
              }
            } else {
              this.snackBar.dismiss();
            }
          });
        }
}
