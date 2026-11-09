import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historico } from '../models/historico.model';

@Injectable({
  providedIn: 'root'
})

export class HistoricoService {

  BASE_URL = "http://localhost:8080/solicitacoes";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private httpClient = inject(HttpClient);

  listarPorSolicitacao(id: number): Observable<Historico[]> {
    return this.httpClient.get<Historico[]>(this.BASE_URL + "/" + id + "/historico",
      this.httpOptions);
  }

}