import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, of, ReplaySubject, throwError } from "rxjs";
import { DetalhesProdutoDTO } from "./apim.service";

@Injectable({
  providedIn: "root",
})
export class ProdutosService {
  URL_INSERT_USER_DEV_PARCEIRO = `http://localhost:8080/desenvolvedor-parceiro`;
  URL_DEV_PARCEIRO_API_KEYS = `http://localhost:8080/minhas-assinaturas`;
  URL_API_DEVELOPERS = `http://localhost:8080`;
  public perfilPlanoList$ = new ReplaySubject<
    { value: string; planos: DetalhesProdutoDTO[] }[]
  >();

  constructor(
    private httpClient: HttpClient,
    private produtosService: ProdutosService
  ) {
    let me = this;
    this.getProdutos().subscribe((produtos) => {
      this.parsePerfilPlanoList(produtos);
    });
  }
  async parsePerfilPlanoList(produtos: any) {
    if (!produtos) {
      return;
    }
    let recursosList = await this.getProdutosRecursos();
    if (recursosList && produtos) {
      const planos = produtos;

      produtos = _.map(produtos, (produto) => {
        // console.log("xxxx", produto);
        produto.recurso = this._mapRecursosProduto(produto, recursosList);
        return produto;
      });

      const planosMap = _.groupBy(planos, (e: any) => {
        const gapidx = e.nomeProduto.indexOf(" ");
        return e.nomeProduto.substr(0, gapidx);
      });
      const perfilPlanoMap = _.map(planosMap, (d, i) => ({
        value: i,
        planos: planosMap[i],
      }));
      this.perfilPlanoList$.next(perfilPlanoMap);
    }
  }

  _mapRecursosProduto(produto, recursosList) {
    if (!!produto.recursos && produto.recursos.length > 0) {
      produto.features = _.cloneDeep(produto.recursos);
    }

    let recursosProduto = _.filter(recursosList, (recurso: any) => {
      return recurso.plano == produto.nomeProduto;
    });
    recursosProduto = _.filter(recursosProduto, (r) => !!r.recurso);
    recursosProduto = _.sortBy(recursosProduto, (r) => r.recurso.length);
    produto.recursos = _.map(recursosProduto, (recurso) => {
      if (recurso && recurso?.recurso != null) {
        return recurso.recurso;
      }
    });

    return produto;
  }

  async getProdutosRecursos() {
    return await this.httpClient
      .get<{ plano: string; recurso: string }[]>(
        `http://localhost:8080produtos/recursos`
      )
      .toPromise();
  }
  getProdutos() {
    return this.httpClient.get<any>(
      `http://localhost:8080produtos/detalhes`
    );
  }
  subscreverPlano(plano) {
    if(plano == undefined ){ return throwError('Erro ao identificar o seu plano ') }
    return this.httpClient.patch<any>(`http://localhost:8080produtos?planoNovo=${plano}`,{});
  }

  getUserSubscriptionsPAT() {
    return this.httpClient.get<any>(
      `http://localhost:8080produtos/minhas-assinaturas`
    );
  }
}
