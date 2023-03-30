import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { Category, Course } from '../../apps/academy/academy.types';
import { AcademyService } from '../../apps/academy/academy.service';
import { ApimService } from 'app/core/services/apim.service';
import { Api } from 'app/core/services/apim.model';
import { NguCarouselConfig } from '@ngu/carousel';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
    selector       : 'project',
    templateUrl    : './project.component.html',
    styleUrls: ['./project.component.scss']
    //encapsulation  : ViewEncapsulation.None,
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit
{
    public loading = false;
    public carouselTileItems: Array<any> = [];
    public carouselTileItems$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public carouselSubscription = this.carouselTileItems$.asObservable();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    apis: Api[];
    operations: any[] = [];

    public readonly carouselTile: NguCarouselConfig = {
        grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
        slide: 4,
        speed: 250,
        point: {
          visible: true,
        },
        load: 2,
        velocity: 0,
        touch: true,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
      };

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private apimService: ApimService,
        private auth: AuthService
    )
    {
      //this.auth.signIn({email: 'hughes.brian@company.com', password: 'admin'});
    }

    ngAfterViewInit(): void {

        this.apimService.getApisFullTree().then((apis: Api[]) => {
          this.loading = true;
          this.apis = apis;
          this.initCarrousel(apis);

          //this._changeDetectorRef.markForCheck();
        }).finally(() => {
            this.loading = false;
        });
      }

      private initCarrousel(apis: Api[]) {
        const me = this;
        const operationList = this.apimService.getOperationsNames(apis);
        const operations = []
        console.log('operations', operationList)
        for (let i = 0; i < operationList.length; i++) {
    
          const o = {
            title: operationList[i].properties.displayName,
            text: operationList[i].properties.description,
            icon: (!!operationList[i]?.properties?.operationImgName) ?
              `https://strgbtpapim.blob.core.windows.net/operations-images/${operationList[i]?.properties?.operationImgName}` :
              `./assets/images/services/thumb${Math.floor(
                Math.random() * 5
              )}.jpg`,
          };
          operations.push(o);
        }

        me.carouselTileItems$.next(operations);

      }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.carouselSubscription.subscribe(tiles => {
            if (!tiles || tiles.length === 0) { return; }
            this.loading = false;
            this.carouselTileItems = tiles;
          });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

  
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
