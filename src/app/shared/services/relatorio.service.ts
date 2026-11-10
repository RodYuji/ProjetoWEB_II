import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemReceita {
  descricao: string;
  valor: number;
}

export interface ReceitaDiaria {
  data: string;
  itens: ItemReceita[];
  total: number;
}

export interface ReceitaCategoria {
  categoria: string;
  total: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private readonly baseUrl = 'http://localhost:8080/api/relatorios';
  private readonly httpClient = inject(HttpClient);

  buscarReceitaPorDia(inicio: string, fim: string): Observable<ReceitaDiaria[]> {
    let params = new HttpParams();
    if (inicio) {
      params = params.set('inicio', inicio);
    }
    if (fim) {
      params = params.set('fim', fim);
    }

    return this.httpClient.get<ReceitaDiaria[]>(`${this.baseUrl}/receita-dia`, { params });
  }

  buscarReceitaPorCategoria(): Observable<ReceitaCategoria[]> {
    return this.httpClient.get<ReceitaCategoria[]>(`${this.baseUrl}/receita-categoria`);
  }
}
