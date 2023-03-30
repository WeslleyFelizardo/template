import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Api,
  ApiSchema,
  ApisResponseRootObject,
  Operation,
  OperationResponse,
  OperationsResponse,
  PortalDevOperationDescription,
  Schema,
  SchemaResponseObject,
} from './apim.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ApimService {
  public token: string;

  schemaResponse: any;

  private _apis$;
  operationResponse: OperationsResponse;
  public _apis: any;
  userApiKeyList = [{SubscriptionId: ''}];



  constructor(private httpClient: HttpClient, public utilService: UtilService
    //private serviceProfileDevParceiro: ProfileDevParceiroService
    ) { }

  getApis() {
    if (!this._apis) {
      return this.httpClient.get<ApisResponseRootObject>(
        `http://localhost:8080/apis`
      );
    }
  }

  async getApisFullTree(): Promise<Api[]> {
    if (!this._apis) {

      const apiResponse = await this.getApis()
        .toPromise();

      for (let i = 0; i < apiResponse.value.length; i++) {
        apiResponse.value[i].operations = (
          await this.getApiOperations(apiResponse.value[i].name, apiResponse.value[i].properties.path).toPromise()
        )?.value;

        const _parseSchemasValue = (_schemaResponse: SchemaResponseObject): ApiSchema[] => {
          return !!_schemaResponse
            ? _schemaResponse.value[0]?.properties?.document?.components
              ?.schemas
            : [];
        };

        apiResponse.value[i].schemas = await this.getSchemas(apiResponse.value[i].name).toPromise();
      }
      this._apis = apiResponse.value;
      return apiResponse.value;
    } else {
      return this._apis;
    }
  }

  public getApiOperations(apiName: any, apiPath: string) {
    const me = this;

    return this.httpClient
      .get<OperationsResponse>(
        `http://localhost:8080/apis/${apiName}/operations`
      )
      .pipe(
        map((operationResponse) => {
          if (operationResponse) {
            operationResponse.value = _.filter(operationResponse.value, (operation) => (me.testJSON(operation.properties.description)));
            operationResponse.value = _.map(operationResponse.value, this.parseOperationDescription);
            operationResponse.value.map(o => o.properties.urlFull = `${apiPath}${o?.properties?.urlTemplate}`);
            this.operationResponse = operationResponse;
            return operationResponse;
          }
        })
      );
  }
  getProducts() {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.httpClient.get(
      `http://localhost:8080/products`
    );
  }
  getMarkdownDemo() {
    return this.httpClient.get(`assets/markdown.json`);
  }

  getSchemas(apiName: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };

    return this.httpClient
      .get(
        `http://localhost:8080/apis/${apiName}/schemas`
      )
      .pipe(
        map((responseSchema: SchemaResponseObject) => {
          if (responseSchema && !!responseSchema?.value[0]) {
            const _parseValue = (_schemaResponse: SchemaResponseObject): ApiSchema[] => {
              return (!!_schemaResponse) ?
                _schemaResponse.value[0]?.properties?.document?.components?.schemas
                : [];
            };
            this.schemaResponse = responseSchema;
            return _parseValue(responseSchema);
          }
        })
      );
  }

  getOperationsNames(apis: Api[]) {
    if (!apis || !apis[0].operations) {
      return [];
    }

    const _apisOperations = apis.map((a: Api) => a.operations || []);
    const fn = _.spread(_.union);
    const _operationsKeys = _.groupBy(fn(_apisOperations), (e: any) => e.properties.displayName);
    const _operationListLastMethods = [];
    for (const key in _operationsKeys) {
      if (key) {
        const element: any = _operationsKeys[key][0];
        const apisComMetodo = _.filter(apis,
          (api: any) => _.filter(api.operations, (_operation) => _operation.displayName === _operation.properties.displayName));
        const apisComMetodoSorted = _.orderBy(apisComMetodo, ['properties.apiVersion', 'operation.name']);
        const apiComMetodoNaUltimaVersao: any = _.last(apisComMetodoSorted);
        const metodoNaUltimaVersao = _.last(_.filter(apiComMetodoNaUltimaVersao.operations,
          { 'properties': { 'displayName': element.properties.displayName, 'method': element.properties.method } }
        ));
        _operationListLastMethods.push({
          ...metodoNaUltimaVersao,
          properties: element.properties
        });
      }

    }
    const mapedMethodsByUrl = _.groupBy(_operationListLastMethods, function (e) { return e?.properties?.urlTemplate.split('/')[1]; });
    return _operationListLastMethods;
  }
  parseOperationDescription(operation: Operation): Operation {
    const descriptionJsonString = operation.properties.description;
    let objDescription: PortalDevOperationDescription;
    objDescription = JSON.parse(descriptionJsonString as string);
    operation.properties.description = objDescription.description;
    operation.properties.operationImgName = objDescription?.portalDev?.operationImgName || undefined;
    operation.properties.operationMarkdownUrl = objDescription?.portalDev?.docsFolder || undefined;
    operation.properties.scope = objDescription?.portalDev?.scope || undefined;
    return operation;
  }
  testJSON(strJson: any) {
    if (!strJson ) {return false; }
    const strPareceValida = (strJson.search(/operationImgName/gm) > -1) || (strJson.search(/portalDev/gm) > -1);
    const valid = this.utilService.testJSON(strJson);
    if (!!strPareceValida && !valid) { console.warn('DESCRIPTION PARECE VALIDO MAS IMPOSSIVEL O PARSE do JSON: JSON.parse: ', strJson); }
    return valid;
  }

 
   
}

export enum EPerfilDesenvolvedor {
  Liner = 0
}

export enum EProduto {
  Basic = 0,
  Business = 1,
  Enterprise = 2
}

export interface IDesenvolvedorParceiroInformacoes {
  "idPerfil"?: EPerfilDesenvolvedor;
  "perfil"?: string;
  "idProduto"?: EProduto;
  "produto"?: string;
  "idDesenvolvedorParceiro"?: number;
  "desenvolvedorInternoBtp"?: boolean;
}

export interface DetalhesProdutoDTO {
  nomeProduto: string;
  preco: number;
  recursos: string[];
  quantidadeAplicacao: number;
}