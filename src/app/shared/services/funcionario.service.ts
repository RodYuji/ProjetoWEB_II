import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  BASE_URL = "http://localhost:8080/funcionarios";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private httpClient = inject(HttpClient);

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.BASE_URL + "/" + id, this.httpOptions);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.BASE_URL,
      JSON.stringify(funcionario), this.httpOptions);
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.BASE_URL + "/" + funcionario.id,
      JSON.stringify(funcionario), this.httpOptions);
  }

  // idLogado: id do funcionário que está usando o sistema
  remover(id: number, idLogado: number): Observable<Funcionario> {
    return this.httpClient.delete<Funcionario>(this.BASE_URL + "/" + id + "?idLogado=" + idLogado,
      this.httpOptions);
  }
}