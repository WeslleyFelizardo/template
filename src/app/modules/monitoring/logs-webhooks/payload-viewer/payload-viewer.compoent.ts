import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenIdConnectService } from 'app/core/auth/open-id-connect.service';
import { ApimService } from 'app/core/services/apim.service';
import { ProdutosService } from 'app/core/services/produtos.service';
import _ from 'lodash';
import { BehaviorSubject, finalize, from, Observable, observeOn, of } from 'rxjs';

@Component({
    selector       : 'payload-viewer',
    templateUrl    : './payload-viewer.component.html',
})
export class PayloadViewerComponent implements OnInit, AfterViewInit
{
    public payload: any;

    constructor(public dialogRef: MatDialogRef<PayloadViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        
    }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
      this.payload = this.data.payloadContent;
  }
    
}
