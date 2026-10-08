import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categorias = [
    { nome: 'Eletrônicos' },
    { nome: 'Informática' },
    { nome: 'Eletrodomésticos' }
  ];

}