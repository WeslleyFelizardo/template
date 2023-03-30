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
    selector       : 'guides',
    templateUrl    : './guides.component.html',
    styleUrls      : ['./guides.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;
    menuData: FuseNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // endpointlist = true;
    @Output()
    loading = true;
    mapedMethodsByUrlList: any[];
    apis$: BehaviorSubject<Api[]> = new BehaviorSubject([]);

    // public readonly apis$O: Observable<Api[]> = this.apis$.asObservable().pipe(audit(ev => interval(500)));
    // showOauth: boolean;
    public apiMenuList: any;
    // resultado: Observable<unknown>;
    // lista: any[];

    public apis: Api[];
    public apiResources!: any;

    // public texto = new FormControl('', [ Validators.minLength(4)]);
    // public formpesquisa: FormGroup;
    // private formValues = {
    //     'filtro': null
    // };
    // search: any;
    // searchField = new FormControl('', [ Validators.minLength(3)]);
    // menuMetodosFiltrado: [{ children: any[]; displayName: string; }] = undefined;


    @Input()
    set operations(operations) {
    if (!operations) { return; }
    this._operations = operations;
    }
    get operations(): any {
    return this._operations;
    }
    _operations;

    operationList = [];
    // panelQueryOpenState = true;
    // panelOpenState = true;
    // panelResponsesOpenState = false;
    // apiListGroup = [];
    // public selected = undefined;
    // // @ViewChild(MatAccordion) accordion: MatAccordion;
    // @ViewChild('filtermethod') inputFiltroMetodo;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        public menuService: MenuDocsService,
        public apimService: ApimService,
    )
    {
        this.menuData = [
            {
                id      : 'getting-started',
                title   : 'Getting started',
                type    : 'group',
                children: [
                    {
                        id   : 'getting-started.overview',
                        title: 'Introduction',
                        type : 'basic',
                        link : '/docs/guides/getting-started/overview',
                        icon: 'heroicons_outline:document-text'
                    },
                    {
                        id   : 'getting-started.security',
                        title: 'Security',
                        type : 'basic',
                        link : '/docs/guides/getting-started/security',
                        icon: 'heroicons_outline:document-text'
                    }
                ]
            },
            {
                id      : 'endpoints',
                title   : 'Endpoints',
                type    : 'group'
            }
        ];
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('md') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            
            this.menuService.apis$.subscribe((menu => {
                this.apiMenuList = menu;

                this.apiMenuList.forEach(menu => {
                    this.menuData.push({
                        id      : menu.displayName.replace(/\s/g, '-').toLowerCase(),
                        title   : menu.displayName,
                        type    : 'collapsable',
                        children: menu.children.map(c => {
                           let normalizeId = c.properties.displayName.replace(/\s/g, '-').toLowerCase();
                           return {
                                id   : normalizeId,
                                title: c.properties.displayName,
                                type : 'basic',
                                link : `/docs/guides/endpoints-spec/${c.properties.displayName}`,
                                icon: 'feather:layers'
                           }
                        })
                    });
                });

                this._changeDetectorRef.markForCheck();
            }));
            
            this.apimService.getApisFullTree().then((apisResponse) => {

                this.apis = apisResponse;
                this.apis$.next(apisResponse);
            });

           

    }

    async setOperationList() {
        if (!this.apis || !this.apis[0].operations) {
          return null;
        }
        const _apisOperations = this.apis.map((a: Api) => a.operations || []);
        const fn = _.spread(_.union);
        const _operations = _.groupBy(fn(_apisOperations), (e: any) => e.properties.displayName);
        const _operationListLastMethods = [];
        Object.keys(_operations).forEach(element => {
          const method: any = _operations[element][0];
          const apisComMetodo = _.filter(this.apis,
            (api: any) => _.filter(api.operations,
              (operation) => operation.displayName === method.properties.displayName));
          const apisComMetodoSorted = _.orderBy(apisComMetodo, ['properties.apiVersion', 'operation.name']);
          const apiComMetodoNaUltimaVersao: any = _.last(apisComMetodoSorted);
          const metodoNaUltimaVersao = _.last(_.filter(apiComMetodoNaUltimaVersao.operations,
            { 'properties': { 'displayName': method.properties.displayName, 'method': method.properties.method } }
          ));
          _operationListLastMethods.push({
            ...metodoNaUltimaVersao,
            properties: method.properties
          });
        });
      
        if (_operationListLastMethods.length > 0) {
          _.merge(this.operationList, _operationListLastMethods);
        }
        this.loading = false;
        const mapedMethodsByUrl = _.groupBy(this.operationList, function (e) { return e?.properties?.scope; });
        this.mapedMethodsByUrlList = _.map(
          Object.keys(mapedMethodsByUrl), function (key) { return { displayName: key, children: mapedMethodsByUrl[key] }; });
        return this.mapedMethodsByUrlList;
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
}
