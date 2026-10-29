import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { Categoria } from '../../../shared/models/categoria.model';

@Component({
  selector: 'app-gerenciamento-categorias',
  imports: [FormsModule],
  templateUrl: './gerenciamento-categorias.component.html',
  styleUrl: './gerenciamento-categorias.component.css',
})
export class GerenciamentoCategoriasComponent implements OnInit {
  private categoriaService = inject(CategoriaService);

  categorias = signal<Categoria[]>([]);
  
  modalAberto = false;
  modoEdicao = false;
  idEditando = 0;
  categoriaForm = { nome: '' };

  modalExclusaoAberto = false;
  categoriaParaExcluir: Categoria | null = null;

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoriaService.listarTodas().subscribe(
      categorias => this.categorias.set(categorias)
    );
  }

  abrirModal() {
    this.categoriaForm = { nome: '' };
    this.modoEdicao = false;
    this.modalAberto = true;
  }

  editarCategoria(categoria: Categoria) {
    this.idEditando = categoria.id;
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
      this.categoriaService.alterar(new Categoria(this.idEditando, nome)).subscribe({
        next: () => { this.modalAberto = false; this.listarCategorias(); },
        error: () => alert('Erro ao alterar a categoria.')
      });
    } else {
      this.categoriaService.inserir(new Categoria(0, nome)).subscribe({
        next: () => { this.modalAberto = false; this.listarCategorias(); },
        error: (err) => alert(err.status === 409
          ? 'Já existe uma categoria com esse nome.'
          : 'Erro ao inserir a categoria.')
      });
    }
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  abrirModalExclusao(categoria: Categoria) {
    this.categoriaParaExcluir = categoria;
    this.modalExclusaoAberto = true;
  }

  confirmarExclusao() {
    if (this.categoriaParaExcluir) {
      this.categoriaService.remover(this.categoriaParaExcluir.id).subscribe(
        () => this.listarCategorias()
      );
    }
    this.modalExclusaoAberto = false;
  }

  cancelarExclusao() {
    this.modalExclusaoAberto = false;
  }
}