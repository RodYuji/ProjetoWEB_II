import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
  selector: 'app-pagamento',
  imports: [DatePipe, RouterLink],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento implements OnInit {

  // solicitação carregada da API
  solicitacao = signal<Solicitacao | null>(null);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (dados: Solicitacao) => this.solicitacao.set(dados),
      error: () => this.solicitacao.set(null)
    });
  }

  // confirmar pagamento 
  confirmarPagamento() {
    const s = this.solicitacao();
    if (s == null) return;
    this.solicitacaoService.pagar(s.id).subscribe({
      next: () => {
        alert('Pagamento confirmado!');
        this.router.navigate(['/home-cliente']);
      },
      error: () => alert('Não foi possível confirmar o pagamento.')
    });
  }
}