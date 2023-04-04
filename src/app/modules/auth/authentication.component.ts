import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { audit, BehaviorSubject, interval, Observable, Subject, takeUntil } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MenuDocsService } from 'app/core/services/menu-docs.service';
import { ApimService } from 'app/core/services/apim.service';
import { Api } from 'app/core/services/apim.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import { Title } from '@angular/platform-browser';

@Component({
    selector       : 'authentication',
    templateUrl    : './authentication.component.html',
    styleUrls      : ['./authentication.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements OnInit, OnDestroy
{
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }
   
}
