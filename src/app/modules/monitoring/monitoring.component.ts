import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenIdConnectService } from 'app/core/auth/open-id-connect.service';
import { ApimService } from 'app/core/services/apim.service';
import { ProdutosService } from 'app/core/services/produtos.service';
import _ from 'lodash';
import { BehaviorSubject, finalize, from, Observable, observeOn, of } from 'rxjs';

@Component({
    selector       : 'monitoring',
    templateUrl    : './monitoring.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitoringComponent implements OnInit, AfterViewInit
{
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }
    
}
