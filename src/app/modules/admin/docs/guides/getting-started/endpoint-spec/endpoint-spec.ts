import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Api } from 'app/core/services/apim.model';
import { ApimService } from 'app/core/services/apim.service';
import { UtilService } from 'app/core/services/util.service';
import { GuidesComponent } from 'app/modules/admin/docs/guides/guides.component';
import _ from 'lodash';
import { MarkdownService } from 'ngx-markdown';
import { audit, BehaviorSubject, interval, Observable, Subscription } from 'rxjs';

@Component({
    selector   : 'endpoint-spec',
    templateUrl: './endpoint-spec.html'
})
export class EndpointSpecComponent implements OnInit, OnDestroy
{
    public urlOverviewMd = 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/overview.md';
    
 
    loading = true;
    //public gatewayUrlPrd = `${environment.gatewayUrlPrd}`;
    //public gatewayUrlQas = `${environment.gatewayUrlQas}`;
    public _selectedEndpointData: any;
    _selectedEndpointDataVersion: any;
    metodosVersoesMaped: any[];
    metodosVersoesLists: any[];
    apiComschemaSelecionado: any;
    public methodMarkdownUrl = `teste/endpoints/empty-pool-report/docs.md`;
    public operationsRootDocPath = `teste/endpoints/`;
  
    public showOauth = true;
    public get selectedEndpointData(): any {
      return this._selectedEndpointData;
    }
    @Input()
    public set selectedEndpointData(value: any) {
      this._selectedEndpointData = value;
      this._selectedEndpointDataVersion = value;
      // this.setLastEndPointVersion(value);
    }
    public apis$: BehaviorSubject<Api[]> = new BehaviorSubject([]);
    public apis$O: Observable<Api[]> = this.apis$.asObservable().pipe(audit(ev => interval(2000)));
  
    private _apiData: any;
    public get apiData(): any {
      return this._apiData;
    }
    @Input()
    public set apiData(value: any) {
      if (!value) { return; }
      this._apiData = value;
    }
  
   
    
    operationList = [];
  
    public apis: Api[];
  
    public subscription: Subscription;
    mapedMethodsByUrlList: any[];

    public currentEndpoint: string = '';
    constructor(
        private _guidesComponent: GuidesComponent, 
        private route: ActivatedRoute,
        public apimService: ApimService,
        public utilService: UtilService)
    {
        this.apis$O.subscribe(async (abt) => {
            await this.setOperationList();
      
          }); 
    }
    
    ngOnInit(): void {
        const me = this;

        this.apis$O.subscribe(async (abt) => {
        await this.setOperationList();

        });
    
        this.apimService.getApisFullTree().then((apisResponse) => {
        me.apis = apisResponse;
        // console.log('apis', me.apis);
        me.apis$.next(apisResponse);
        me.subscription = me.route.params
            .subscribe(
            (params: Params) => {
                me.loadMethod(params?.endpoint as string);
            }
            ); 
        }, (error) => { console.error(error); });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async setOperationList() {
        const me = this;
        if (!me.apis || !me.apis[0].operations) {
          return null;
        }
        const _apisOperations = me.apis.map((a: Api) => a.operations || []);
        const fn = _.spread(_.union);
        const _operations = _.groupBy(fn(_apisOperations), (e: any) => e.properties.displayName);
        const _operationListLastMethods = []; 
        const method: any = _operations[me.route.snapshot.params.endpoint][0];
    
        const apisComMetodo = _.filter(me.apis,
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
    
        if (_operationListLastMethods.length > 0) {
          _.merge(me.operationList, _operationListLastMethods);
        }
        me.loading = false;
        const mapedMethodsByUrl = _.groupBy(me.operationList, function (e) { return e?.properties?.urlTemplate.split('/')[1]; });
        me.mapedMethodsByUrlList = _.map(
          Object.keys(mapedMethodsByUrl), function (key) { return { displayName: key, children: mapedMethodsByUrl[key] }; });
    
        me.setLastEndPointVersion(metodoNaUltimaVersao);
        return me.mapedMethodsByUrlList;
      }

    loadMethod(arg0: string) {
        const me = this;
        console.log('arg', arg0);
        me.metodosVersoesLists = [];
        const api = _.find(me.apis, {
          operations: [{ properties: { displayName: arg0 } }]
        });
        const operation = _.find(api.operations,
          { 'properties': { 'displayName': arg0 } }
    
        );
    
          me.setLastEndPointVersion(operation);
      }
      setLastEndPointVersion(value) {
        const me = this;
        if (!value || !me.apis) { return null; }
        let apisComMetodoSorted;
        let apiComMetodoNaUltimaVersao;
        let metodoNaUltimaVersao;
        let metodosVersoesMaped;
        const apisComMetodo = _.filter(me.apis,
          {
            operations: [{ properties: { displayName: value.properties.displayName } }]
          });
        apisComMetodoSorted = _.orderBy(apisComMetodo, ['properties.apiVersion', 'operation.name']);
        apiComMetodoNaUltimaVersao = _.last(apisComMetodoSorted);
        metodoNaUltimaVersao = _.last(_.filter(apiComMetodoNaUltimaVersao.operations,
          { 'properties': { 'displayName': value.properties.displayName } }
        ));
        metodosVersoesMaped = _.map(_.map(apisComMetodoSorted,
          (e) => _.filter(e.operations, { properties: { displayName: value.properties.displayName } })), (el) => el[0] || null); 
    
        me.metodosVersoesLists = _.filter(metodosVersoesMaped, (m) => m !== null);
        metodoNaUltimaVersao.properties._schema = apiComMetodoNaUltimaVersao.schemas;
        me._selectedEndpointDataVersion = metodoNaUltimaVersao;
        me.selectedEndpointData = metodoNaUltimaVersao;

        //if(!!me.tab && !!me.tab.selectedIndex) {me.tab.selectedIndex = 0; }

        me.setMethodMarkdown(metodoNaUltimaVersao, value);
        me.showOauth = false;
    
      }

      getVersaoLabel(urlTemplate) {
        if (!urlTemplate) { return ''; }
        return urlTemplate.split('/')[2];
      }

      setMethodMarkdown(metodoNaUltimaVersao: any, value) {
        const versao = this.getVersaoLabel(value.properties?.urlTemplate);
      }
    
      copyText(content) {
        if (!content) { return; }
        this.utilService.copyTextClipboard(content);
      }
    
      getMarkdownUrl() {
        if (!this._selectedEndpointDataVersion?.properties?.operationMarkdownUrl) { return undefined; }
        return `${this.operationsRootDocPath}${this._selectedEndpointDataVersion.properties.operationMarkdownUrl}`;
      }

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void
    {
        // Toggle the drawer
        this._guidesComponent.matDrawer.toggle();
    }

    ngOnDestroy(): void {
    }
}
