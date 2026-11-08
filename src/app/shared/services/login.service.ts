import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError, catchError, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Login } from '../models/login.model';

// Chave onde o usuário logado fica guardado no navegador
const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = "http://localhost:8080/login";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private httpClient = inject(HttpClient);

    // Lê o usuário logado do localStorage
  public get usuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  // Grava o usuário logado no localStorage
  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {
    return this.httpClient.post<Usuario>(this.BASE_URL, JSON.stringify(login), this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Usuario>) => {
          if (resp.status == 200) {
            return resp.body;
          }
          else {
            return null;
          }
        }),
        catchError((err) => {
          if (err.status == 401) {   // email ou senha errados
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }
}