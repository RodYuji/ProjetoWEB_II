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
  modoEdicao = false;
  indiceEditando = -1;
  categoriaForm = { nome: '' };

  modalExclusaoAberto = false;
  categoriaParaExcluir: any = null;

  abrirModal() {
    this.categoriaForm = { nome: '' };
    this.modoEdicao = false;
    this.modalAberto = true;
  }

  editarCategoria(categoria: any) {
    this.indiceEditando = this.categorias.indexOf(categoria);
    this.categoriaForm = { nome: categoria.nome };
    this.modoEdicao = true;
    this.modalAberto = true;
  }

  salvarCategoria() {
    const nome = this.categoriaForm.nome.trim();

    if (nome === '') {
      return;
    }

    if (this.modoEdicao) {
      this.categorias[this.indiceEditando].nome = nome;
    } else {
      this.categorias.push({ nome });
    }

    this.modalAberto = false;
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  abrirModalExclusao(categoria: any) {
    this.categoriaParaExcluir = categoria;
    this.modalExclusaoAberto = true;
  }

  confirmarExclusao() {
    if (this.categoriaParaExcluir) {
      this.categorias = this.categorias.filter(
        c => c !== this.categoriaParaExcluir
      );
    }
    this.modalExclusaoAberto = false;
  }

  cancelarExclusao() {
    this.modalExclusaoAberto = false;
  }
}