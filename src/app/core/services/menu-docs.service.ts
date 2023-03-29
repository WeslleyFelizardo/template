import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Injectable, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatIconRegistry } from '@angular/material/icon';
import * as _ from 'lodash';
import { BehaviorSubject, interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { audit } from 'rxjs/operators';
import { Api } from './apim.model';
import { ApimService } from './apim.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDocsService implements OnInit {

  mapedMethodsByUrlList: any[];
  public apis$: Subject<any> = new ReplaySubject();
  public readonly apis$Observable: Observable<Api[]> = this.apis$.asObservable();


  operationList = [];
  panelQueryOpenState = true;
  panelOpenState = true;
  panelResponsesOpenState = false;
  apiListGroup = [];
  public selected = undefined;
  @ViewChild(MatAccordion) accordion: MatAccordion;


  public apis: Api[];
  public apiResources!: any;

  constructor(
    overlayContainer: OverlayContainer,
    matIconRegistry: MatIconRegistry,
    public apimService: ApimService
  ) {
    this.apimService.getApisFullTree().then(async (apisResponse) => {
      const operations = await this.extractGroupedOperationList(apisResponse);
      this.apis$.next(operations);
    }, (error) => { console.error(error); });
  }

  async getMenu() {
    return  this.mapedMethodsByUrlList;
   }

  ngOnInit(): void { 

  }



  async extractGroupedOperationList(apis: Api[]) { 
    if (!apis || !apis[0].operations) {
      return null;
    }
    const _apisOperations = apis.map((a: Api) => a.operations || []);
    const fn = _.spread(_.union);
    const _operations = _.groupBy(fn(_apisOperations), (e: any) => e.properties.displayName);
    const _operationListLastMethods = [];
    Object.keys(_operations).forEach(element => {
      const method: any = _operations[element][0];
      const apisComMetodo = _.filter(apis,
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

    const mapedMethodsByUrl = _.groupBy(this.operationList, function (e) { return e?.properties?.scope; });
    this.mapedMethodsByUrlList = _.map(
      Object.keys(mapedMethodsByUrl), function (key) { return { displayName: key, children: mapedMethodsByUrl[key] }; });
    return this.mapedMethodsByUrlList;
  }

}

