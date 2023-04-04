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
        
      
        }
}
