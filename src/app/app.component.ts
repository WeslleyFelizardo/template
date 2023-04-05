import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
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
    constructor(private _transloco: TranslocoService)
    {
    }

    ngOnInit(): void {
        let languageSelected = 'en';

        if (navigator.language.includes('pt'))
            languageSelected = 'pt'
        
        this._transloco.setActiveLang(languageSelected);
    }
}
