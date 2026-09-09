import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { SolicitacaoService } from '../../shared/services/solicitacao-cliente.service';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard, RouterLink, DatePipe],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {
  /*filtroStatus = 'TODAS';
  solicitacoes: any[] = [];
  solicitacoesFiltradas: any[] = [];
  constructor(private router: Router,private solicitacaoService: SolicitacaoService
) {
  this.solicitacoes = this.solicitacaoService.solicitacoes;
  this.solicitacoesFiltradas = this.solicitacoes;
  */
  private solicitacaoService = inject(SolicitacaoService);
  private router = inject(Router);

  solicitacoes: SolicitacaoManutencao[] = this.solicitacaoService.listar();

  constructor() {
  console.log('Solicitações na Home:', this.solicitacoes);

}

  verDetalhes(solicitacao: SolicitacaoManutencao): void {
    this.router.navigate(['/detalhes-solicitacao', solicitacao.id]);
  }

  verOrcamento(solicitacao: any) {
    this.router.navigate(['/orcamento', solicitacao.id]);
  }

verPagamento(solicitacao: any) {
  console.log('HOME RECEBEU O EVENTO');
  console.log(solicitacao);

  this.router.navigate(['/pagamento', solicitacao.id]);
}

  filtrarStatus(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;

    if(valorSelecionado === 'TODAS') {
      this.solicitacoes = this.solicitacoes;
    } else {
      this.solicitacoes = this.solicitacoes.filter(solicitacao => solicitacao.estado === valorSelecionado);
    }
  }
}