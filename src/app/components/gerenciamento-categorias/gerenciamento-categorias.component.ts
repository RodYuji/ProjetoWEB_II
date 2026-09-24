import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-categorias',
  imports: [],
  templateUrl: './gerenciamento-categorias.component.html',
  styleUrl: './gerenciamento-categorias.component.css',
})
export class GerenciamentoCategoriasComponent {
  categorias = [
  { nome: 'Eletrônicos' },
  { nome: 'Informática' },
  { nome: 'Eletrodomésticos' }
];

editarCategoria(categoria: any) {
  const novoNome = prompt('Digite o novo nome:', categoria.nome);

  if (novoNome) {
    categoria.nome = novoNome;
  }
}

excluirCategoria(categoria: any) {
  const confirmar = confirm(`Deseja excluir ${categoria.nome}?`);

  if (confirmar) {
    this.categorias = this.categorias.filter(
      c => c !== categoria
    );
  }
}
}
