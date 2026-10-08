import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../shared/services/categoria.service';

@Component({
  selector: 'app-gerenciamento-categorias',
  imports: [FormsModule],
  templateUrl: './gerenciamento-categorias.component.html',
  styleUrl: './gerenciamento-categorias.component.css',
})
export class GerenciamentoCategoriasComponent {
  categorias: { nome: string }[] = [];

  modalAberto = false;
  modoEdicao = false;
  indiceEditando = -1;
  categoriaForm = { nome: '' };

  constructor(private categoriaService: CategoriaService) {
  this.categorias = this.categoriaService.categorias;
}

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

  excluirCategoria(categoria: any) {
    const confirmar = confirm(`Deseja excluir ${categoria.nome}?`);

    if (confirmar) {
      this.categorias = this.categorias.filter(
        c => c !== categoria
      );
    }
  }
}