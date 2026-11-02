import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  BASE_URL = "http://localhost:8080/categorias";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private httpClient = inject(HttpClient);

  listarTodas(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.BASE_URL + "/" + id, this.httpOptions);
  }

  inserir(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.BASE_URL,
      JSON.stringify(categoria), this.httpOptions);
  }

  alterar(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.BASE_URL + "/" + categoria.id,
      JSON.stringify(categoria), this.httpOptions);
  }

  remover(id: number): Observable<Categoria> {
    return this.httpClient.delete<Categoria>(this.BASE_URL + "/" + id, this.httpOptions);
  }
}