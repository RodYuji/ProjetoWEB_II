import { Component } from '@angular/core';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../shared/services/solicitacao.service';

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {
  filtroStatus = 'TODAS';

 solicitacoes: any[] = [];
solicitacoesFiltradas: any[] = [];

 constructor(
  private router: Router,
  private solicitacaoService: SolicitacaoService
) {
  this.solicitacoes = this.solicitacaoService.listar();
  this.solicitacoesFiltradas = this.solicitacoes;
}

  verDetalhes(solicitacao: any) {
    this.router.navigate(['/detalhes-solicitacao', solicitacao.id]);
  }

  verOrcamento(solicitacao: any) {
    this.router.navigate(['/orcamento', solicitacao.id]);
  }

  verPagamento(solicitacao: any) {
    this.router.navigate(['/pagamento', solicitacao.id]);
  }

  filtrarEstado(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;

    if (valorSelecionado === 'TODAS') {
      this.solicitacoesFiltradas = this.solicitacoes;
    } else {
      this.solicitacoesFiltradas = this.solicitacoes.filter(
        solicitacao => solicitacao.estado === valorSelecionado
      );
    }
  }

  abrirNovaSolicitacao() {
    this.router.navigate(['/nova-solicitacao']);
  }
}