import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { HistoricoService } from '../../../shared/services/historico.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Historico } from '../../../shared/models/historico.model';

@Component({
  selector: 'app-detalhes-solicitacao',
  imports: [DatePipe, RouterLink],
  templateUrl: './detalhes-solicitacao.html',
  styleUrl: './detalhes-solicitacao.css',
})
export class DetalhesSolicitacao implements OnInit {

  // dados da solicitação e histórico - com signals a tela atualiza quando a API responde
  solicitacao = signal<Solicitacao | null>(null);
  historico = signal<Historico[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);
  private historicoService = inject(HistoricoService);

  ngOnInit(): void {
    this.carregar(Number(this.route.snapshot.paramMap.get('id')));
  }

  carregar(id: number): void {
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (dados: Solicitacao) => this.solicitacao.set(dados),
      error: () => this.solicitacao.set(null)
    });
    this.historicoService.listarPorSolicitacao(id).subscribe({
      next: (dados: Historico[]) => this.historico.set(dados == null ? [] : dados)
    });
  }

  // Botões de ação conforme o estado
  verOrcamento(): void {
    this.router.navigate(['/orcamento', this.solicitacao()?.id]);
  }

  verPagamento(): void {
    this.router.navigate(['/pagamento', this.solicitacao()?.id]);
  }

  // REJEITADA -> APROVADA
  resgatarServico(): void {
    const s = this.solicitacao();
    if (s == null || !confirm('Deseja resgatar este serviço?')) return;
    this.solicitacaoService.resgatar(s.id).subscribe({
      next: () => {
        alert('Serviço resgatado com sucesso!');
        this.carregar(s.id);
      },
      error: () => alert('Não foi possível resgatar o serviço.')
    });
  }
}