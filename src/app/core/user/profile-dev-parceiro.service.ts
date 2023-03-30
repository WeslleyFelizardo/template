import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { Observable, of, ReplaySubject } from 'rxjs';
import { IDesenvolvedorParceiroInformacoes } from '../services/apim.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileDevParceiroService {
  


  URL_INSERT_USER_DEV_PARCEIRO = `${environment.apiDeveloper}desenvolvedor-parceiro`;
  URL_DEV_PARCEIRO_API_KEYS =  `${environment.apiDeveloper}produtos/minhas-assinaturas`;
  URL_API_DEVELOPERS =  `${environment.apiDeveloper}`;
  

  


  constructor(private httpClient: HttpClient) {
    let me = this;
   
   }

  getSusbscriptionKeys() {
    // return of([
    //   {
    //     subscriptionId: 'as54aA456456a5Aasdasdasdasd',
    //     clientId: 'BTP-INTEGRA',
    //     clientSecret: 'SAihas089sasa897s9adsa9d8sadad98dsa89d89as',
    //     clientName: 'AppIntegracao',
    //     primaryKey: 'asduai6a5s676assuhudasd',
    //     secondaryKey: 'asdas878sa4sd57asd7',
    //     _primaryKeyType: 'password',
    //     _secondaryKeyType: 'password',
    //   },
    //   {
    //     subscriptionId: 'as54aA456456a5Aasdasdasdasd',
    //     clientId: 'BTP-INTEGRA',
    //     clientSecret: 'SAihas089sasa897s9adsa9d8sadad98dsa89d89as',
    //     clientName: 'AppIntegracao',
    //     primaryKey: 'asduai6a5s676assuhudasd',
    //     secondaryKey: 'asdas878sa4sd57asd7',
    //     _primaryKeyType: 'password',
    //     _secondaryKeyType: 'password',
    //   },
    // ]);
    return this.httpClient.get<MinhasAssinaturasDTO[]>(`${this.URL_API_DEVELOPERS}produtos/minhas-assinaturas`);
  }
  inserirDesenvolvedorParceiro(formData: any) {
    if(!formData){return}
    return this.httpClient.post(`${this.URL_API_DEVELOPERS}desenvolvedor-parceiro`, formData);
  }

  inserirAppDevParceiro(nomeApp: any) {
    debugger
      return this.httpClient.post(`${this.URL_API_DEVELOPERS}produtos`, {nomeExibicao: nomeApp});
  }


 


  getDevParceiroPerfil() {
    // return of({desenvolvedor: false, idPerfil: 0, perfil: 'Liner', idProduto: 1, produto: 'Business'});
    return this.httpClient.get<IDesenvolvedorParceiroInformacoes>(
      `${environment.apiDeveloper}desenvolvedor-parceiro/informacoes`
    );
  }

  



  webhookConfigInsert(formData: any) {
    const options = {
        params: { ...formData },
    };
    return this.httpClient.post(`${this.URL_API_DEVELOPERS}webhook-config`, formData);
  }
  webhookConfigUpdate(formData: any) {
    const options = {
        params: { ...formData },
    };
    return this.httpClient.put(`${this.URL_API_DEVELOPERS}webhook-config`, formData);
  }
  webhookConfigGet(formData: any) {
    const options = {
        params: { ...formData },
    };
    return this.httpClient.get(`${this.URL_API_DEVELOPERS}webhook-config`);
  }


}
export interface MinhasAssinaturasDTO {
  subscriptionId: string;
  clientName: string;
  primaryKey: string;
  secondaryKey: string;
  clientId: string;
  clientSecret: string;
}