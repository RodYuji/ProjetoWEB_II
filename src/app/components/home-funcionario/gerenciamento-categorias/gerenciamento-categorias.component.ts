import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciamento-categorias',
  imports: [FormsModule],
  templateUrl: './gerenciamento-categorias.component.html',
  styleUrl: './gerenciamento-categorias.component.css',
})
export class GerenciamentoCategoriasComponent {
  categorias = [
    { nome: 'Eletrônicos' },
    { nome: 'Informática' },
    { nome: 'Eletrodomésticos' }
  ];

  modalAberto = false;
  novaCategoria = { nome: '' };

  abrirModal() {
    this.novaCategoria = { nome: '' };
    this.modalAberto = true;
  }

  salvarCategoria() {
    if (this.novaCategoria.nome.trim() !== '') {
      this.categorias.push({ ...this.novaCategoria });
      this.modalAberto = false;
    }
  }

  cancelarModal() {
    this.modalAberto = false;
  }

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