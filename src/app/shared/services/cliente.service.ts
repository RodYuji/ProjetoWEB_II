import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  BASE_URL = "http://localhost:8080/clientes";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private httpClient = inject(HttpClient);

  // RF001, no padrão do inserir() do slide 1126:
  // 201 -> devolve o cliente cadastrado; erro (409, 400...) -> repassa para a tela tratar
  autocadastro(cliente: Cliente): Observable<Cliente | null> {
    return this.httpClient.post<Cliente>(this.BASE_URL + "/autocadastro",
      JSON.stringify(cliente),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Cliente>) => {
          if (resp.status == 201) {
            return resp.body;
          }
          else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
