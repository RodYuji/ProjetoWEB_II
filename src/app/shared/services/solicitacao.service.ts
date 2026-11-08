import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitacao } from '../models/solicitacao.model';


@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  BASE_URL = "http://localhost:8080/solicitacoes";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  private httpClient = inject(HttpClient);

  // SOLICITAÇÃO DO CLIENTE
  listarPorCliente(idCliente: number): Observable<Solicitacao[]>{
    return this.httpClient.get<Solicitacao[]>(this.BASE_URL + "/cliente/" + idCliente, this.httpOptions);
  }

  //SOLICITAÇÕES ABERTAS
  listarAbertas(): Observable<Solicitacao[]>{
    return this.httpClient.get<Solicitacao[]>(this.BASE_URL + "/abertas", this.httpOptions);
  }

  //TODAS
  listarTodas(idFuncionario: number): Observable<Solicitacao[]>{
    return this.httpClient.get<Solicitacao[]>(this.BASE_URL + "/funcionario/" + idFuncionario, this.httpOptions);
  }

  //POR PERÍODO
  listarPorPeriodo(idFuncionario: number, inicio: string, fim: string): Observable<Solicitacao[]>{
    return this.httpClient.get<Solicitacao[]>(this.BASE_URL + "/funcionario/" + idFuncionario + "/" + inicio + "/" + fim, this.httpOptions);
  }

  //POR ID DE SOLICITACAO
  buscarPorId(id: number): Observable<Solicitacao>{
    return this.httpClient.get<Solicitacao>(this.BASE_URL + "/" + id, this.httpOptions);
  }

  //CLIENTE
  //INSERÇÃO
  inserir(solicitacao: Solicitacao): Observable<Solicitacao>{
    const corpo = {
      cliente: { id: solicitacao.cliente.id },
      categoria: { id: solicitacao.categoria.id },
      descricaoEquipamento: solicitacao.descricaoEquipamento,
      descricaoDefeito: solicitacao.descricaoDefeito
    };
    return this.httpClient.post<Solicitacao>(this.BASE_URL, JSON.stringify(corpo), this.httpOptions);
  }

  //APROVAR ORÇAMENTO
  aprovar(id: number): Observable<Solicitacao>{
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/aprovar", null, this.httpOptions);
  }

  //REJEITAR ORÇAMENTO
  rejeitar(id: number, motivo: string): Observable<Solicitacao>{
    const corpo = { observacao: motivo };
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/rejeitar", JSON.stringify(corpo), this.httpOptions);
  }

  //RESGATAR SERVIÇO
  resgatar(id: number):Observable<Solicitacao> {
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/resgatar", null, this.httpOptions);
  }

  //PAGAR SERVIÇO
  pagar(id: number): Observable<Solicitacao> {
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/pagar", null, this.httpOptions);
  }

  //FUNCIONARIO
  //EFETUAR ORÇAMENTO
  orcar(id: number, valor: number, idFuncionario: number): Observable<Solicitacao>{
    const corpo = {
      valorOrcamento: valor,
      funcionarioOrcamento: { id: idFuncionario }
    };
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/orcar", JSON.stringify(corpo), this.httpOptions);
  }

  //EFETUAR MANUTENÇÃO
  arrumar(id: number, descricaoManutencao: string, orientacoesCliente: string, idFuncionario: number): Observable<Solicitacao>{
    const corpo = {
      descricaoManutencao: descricaoManutencao,
      orientacoesCliente: orientacoesCliente,
      funcionarioManutencao: { id: idFuncionario }
    };
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/arrumar", JSON.stringify(corpo), this.httpOptions);
  }

  //REDIRECIONAR MANUTENCAO
  redirecionar(id: number, idOrigem: number, idDestino: number): Observable<Solicitacao>{
    const corpo = {
      funcionario: { id: idOrigem },
      funcionarioDestino: { id: idDestino }
    };
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/redirecionar", JSON.stringify(corpo), this.httpOptions);
  }

  //FINALIZAR SOLICITAÇÃO
  finalizar(id: number, idFuncionario: number): Observable<Solicitacao> {
    const corpo = {
      funcionarioFinalizacao: { id: idFuncionario } 
    };
    return this.httpClient.put<Solicitacao>(this.BASE_URL + "/" + id + "/finalizar", JSON.stringify(corpo), this.httpOptions);
  }
}