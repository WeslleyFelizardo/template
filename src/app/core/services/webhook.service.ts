import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { environment } from "environments/environment";
import {
  Observable,
  of as _observableOf,
  throwError as _observableThrow,
  from,
  of,
} from "rxjs";
import {
  catchError as _observableCatch,
  mergeMap as _observableMergeMap,
} from "rxjs/operators";

export const WEBHOOK_API_BASE_URL = new InjectionToken<string>(
  `${environment.apiWebHook}`
);

@Injectable()
export class WebhookService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;
  public api_version = "1.0";
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(WEBHOOK_API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : `${environment.apiWebHook}`;
  }

  /**
   * @param body (optional)
   * @return Success
   */
  configuracaoPOST(body: WebhookConfiguracaoDTO | undefined) {
    let url_ = this.baseUrl + "configuracao?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post(url_, body);
  }


  configuracaoGET()  {
    let url_ = this.baseUrl + "configuracao"; 
    return this.http.get<IWebhookConfiguracaoDTO>(url_);
  } 

 
  configuracaoPUT(body: WebhookConfiguracaoDTO): Observable<any> {
    let url_ = this.baseUrl + "configuracao?"; 
    url_ = url_.replace(/[?&]$/, ""); 
    return this.http.put(url_, body);
  }

  /**
   * @param statusCode (optional)
   * @param enviadoEm (optional)
   * @param enviadoAte (optional)
   * @param tipoEvento (optional)
   
   * @return Success
   */
  logs(
    statusCode?: number | undefined,
    enviadoEm?: Date | undefined,
    enviadoAte?: Date | undefined,
    tipoEvento?: WebhookType | undefined
  ): Observable<any> {
    let url_ = this.baseUrl + "logs?";
    if (statusCode !== null)
      url_ += "StatusCode=" + encodeURIComponent("" + statusCode) + "&";
    if (enviadoEm !== null && enviadoAte !== null) {
      url_ +=
        "EnviadoEm=" +
        encodeURIComponent(
          enviadoEm ? "" + new Date(enviadoEm).toUTCString() : ""
        ) +
        "&";
      url_ +=
        "EnviadoAte=" +
        encodeURIComponent(
          enviadoAte ? "" + new Date(enviadoAte).toUTCString() : ""
        ) +
        "&";
    }

    if (tipoEvento !== null)
      url_ += "TipoEvento=" + encodeURIComponent("" + tipoEvento) + "&";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.request("get", url_);
  }

  protected processLogs(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return of(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(null as any);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "N\u00e3o autenticado para solicitar recurso",
            status,
            _responseText,
            _headers
          );
        })
      );
    } else if (status === 403) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "N\u00e3o possui privil\u00e9gios suficientes para acessar este recurso",
            status,
            _responseText,
            _headers
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(null as any);
  }

  /**
   
   * @param body (optional)
   * @return Success
   */
  parceiroPOST(body: InserirWebhookDTO): Observable<any> {
    let url_ = this.baseUrl + "parceiro?";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      observe: "response",
      responseType: "application/json",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http.post(url_, body, options_);

    // .pipe(
    //   _observableMergeMap((response_: any) => {
    //     return this.processParceiroPOST(response_);
    //   })
    // )
    // .pipe(
    //   _observableCatch((response_: any) => {
    //     if (response_ instanceof HttpResponseBase) {
    //       try {
    //         return this.processParceiroPOST(response_ as any);
    //       } catch (e) {
    //         return _observableThrow(e) as any as Observable<void>;
    //       }
    //     } else return _observableThrow(response_) as any as Observable<void>;
    //   })
    // );
  }

  protected processParceiroPOST(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(null as any);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "N\u00e3o autenticado para solicitar recurso",
            status,
            _responseText,
            _headers
          );
        })
      );
    } else if (status === 403) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "N\u00e3o possui privil\u00e9gios suficientes para acessar este recurso",
            status,
            _responseText,
            _headers
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(null as any);
  }

  /**
   * ListarWebhookParceiro
   * @return Success
   */
  parceiroGET(): Observable<any> { 
    let url_ = this.baseUrl + "parceiro"; 

    let options_: any = {
      observe: "response",
      responseType: "blob", 
    };

    return this.http.get(url_); 
  }

 
  /**
   
   * @param body (optional)
   * @return Success
   */
  parceiroPUT(body: WebhookParceiroDTO){
    let url_ = this.baseUrl + "parceiro?";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.put(url_, body)      
  } 
}

export class AtualizarWebhookDTO implements IAtualizarWebhookDTO {
  idWebhookParceiro?: number;
  parametrizacao?: string | undefined;
  status?: boolean;

  constructor(data?: IAtualizarWebhookDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.idWebhookParceiro = _data["idWebhookParceiro"];
      this.parametrizacao = _data["parametrizacao"];
      this.status = _data["status"];
    }
  }

  static fromJS(data: any): AtualizarWebhookDTO {
    data = typeof data === "object" ? data : {};
    let result = new AtualizarWebhookDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["idWebhookParceiro"] = this.idWebhookParceiro;
    data["parametrizacao"] = this.parametrizacao;
    data["status"] = this.status;
    return data;
  }
}

export interface IAtualizarWebhookDTO {
  idWebhookParceiro?: number;
  parametrizacao?: string | undefined;
  status?: boolean;
}

export class InserirWebhookDTO implements IInserirWebhookDTO {
  idWebhook?: number;
  parametrizacao?: string | undefined;

  constructor(data?: IInserirWebhookDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.idWebhook = _data["idWebhook"];
      this.parametrizacao = _data["parametrizacao"];
    }
  }

  static fromJS(data: any): InserirWebhookDTO {
    data = typeof data === "object" ? data : {};
    let result = new InserirWebhookDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["idWebhook"] = this.idWebhook;
    data["parametrizacao"] = this.parametrizacao;
    return data;
  }
}

export interface IInserirWebhookDTO {
  idWebhook?: number;
  parametrizacao?: string | undefined;
}

export class WebhookConfiguracaoDTO implements IWebhookConfiguracaoDTO {
  endpoint?: string | undefined;
  usuario?: string | undefined;
  senha?: string | undefined;
  segredo?: string | undefined;

  constructor(data?: IWebhookConfiguracaoDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.endpoint = _data["endpoint"];
      this.usuario = _data["usuario"];
      this.senha = _data["senha"];
      this.segredo = _data["segredo"];
    }
  }

  static fromJS(data: any): WebhookConfiguracaoDTO {
    data = typeof data === "object" ? data : {};
    let result = new WebhookConfiguracaoDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["endpoint"] = this.endpoint;
    data["usuario"] = this.usuario;
    data["senha"] = this.senha;
    data["segredo"] = this.segredo;
    return data;
  }
}

export interface IWebhookConfiguracaoDTO {
  endpoint?: string | undefined;
  usuario?: string | undefined;
  senha?: string | undefined;
  segredo?: string | undefined;
}

export enum WebhookType {
  _1 = 1,
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

export interface WebhookParceiroDTO {
  idWebhookParceiro?: number;
  idWebhook?: number;
  parametrizacao?: string;
  ativo?: number;
}
