import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Categoria } from '../../../shared/models/categoria.model';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { CategoriaService } from '../../../shared/services/categoria.service';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [FormsModule, RouterLink],
  templateUrl: './nova-solicitacao.html',
})
export class NovaSolicitacao implements OnInit {

  // trocar pelo id do cliente logado quando o login estiver integrado e apagar comentário
  idCliente = 3;

  private solicitacaoService = inject(SolicitacaoService);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);

  descricaoEquipamento = '';
  idCategoria = 0;
  descricaoDefeito = '';
  mensagemErro = '';

  //com signal a tela atualiza quando a API responde
  categorias = signal<Categoria[]>([]);

  ngOnInit(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (dados: Categoria[]) => {
        if (dados == null) {
          this.categorias.set([]);
        } else {
          this.categorias.set(dados);
        }
      }
    });
  }

  // registrar solicitação 
  registrarSolicitacao(): void {
    if (!this.formularioValido()) {
      this.mensagemErro = 'Preencha todos os campos da solicitação.';
      return;
    }

    const solicitacao = new Solicitacao();
    solicitacao.cliente.id = this.idCliente;
    solicitacao.categoria.id = this.idCategoria;
    solicitacao.descricaoEquipamento = this.descricaoEquipamento.trim();
    solicitacao.descricaoDefeito = this.descricaoDefeito.trim();

    this.solicitacaoService.inserir(solicitacao).subscribe({
      next: () => {
        alert('Solicitação registrada com sucesso!');
        this.router.navigate(['/home-cliente']);
      },
      error: (erro) => {
        if (erro.status === 400) {
          this.mensagemErro = 'Dados inválidos. Confira os campos.';
        } else {
          this.mensagemErro = 'Não foi possível registrar a solicitação.';
        }
      }
    });
  }

  limparFormulario(): void {
    this.descricaoEquipamento = '';
    this.idCategoria = 0;
    this.descricaoDefeito = '';
    this.mensagemErro = '';
  }

  private formularioValido(): boolean {
    return Boolean(
      this.descricaoEquipamento.trim() &&
      this.idCategoria > 0 &&
      this.descricaoDefeito.trim(),
    );
  }
}