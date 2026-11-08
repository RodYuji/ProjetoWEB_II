import { Component, OnInit, inject, signal } from '@angular/core';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../shared/services/solicitacao.service';
import { Solicitacao } from '../../shared/models/solicitacao.model';

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent implements OnInit {

  // trocar pelo id do cliente logado quando o login estiver integrado e apagar comentário
  idCliente = 3;

  filtroStatus = 'TODAS';

  solicitacoes = signal<Solicitacao[]>([]);
  solicitacoesFiltradas = signal<Solicitacao[]>([]);

  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);

  ngOnInit(): void {
    this.listarSolicitacoes();
  }

  listarSolicitacoes(): void {
    this.solicitacaoService.listarPorCliente(this.idCliente).subscribe({
      next: (dados: Solicitacao[]) => {
        if (dados == null) {
          dados = [];
        }
        this.solicitacoes.set(dados);
        this.aplicarFiltro();
      },
      error: () => {
        alert('Erro ao carregar as solicitações.');
      }
    });
  }

  verDetalhes(solicitacao: Solicitacao) {
    this.router.navigate(['/detalhes-solicitacao', solicitacao.id]);
  }

  verOrcamento(solicitacao: Solicitacao) {
    this.router.navigate(['/orcamento', solicitacao.id]);
  }

  verPagamento(solicitacao: Solicitacao) {
    this.router.navigate(['/pagamento', solicitacao.id]);
  }

  filtrarEstado(event: Event) {
    this.filtroStatus = (event.target as HTMLSelectElement).value;
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    if (this.filtroStatus === 'TODAS') {
      this.solicitacoesFiltradas.set(this.solicitacoes());
    } else {
      this.solicitacoesFiltradas.set(this.solicitacoes().filter(
        solicitacao => solicitacao.estado.nome === this.filtroStatus
      ));
    }
  }

  abrirNovaSolicitacao() {
    this.router.navigate(['/nova-solicitacao']);
  }
}