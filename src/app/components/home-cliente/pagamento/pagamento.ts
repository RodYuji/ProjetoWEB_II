import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pagamento',
  imports: [DatePipe, RouterLink],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento {

  solicitacao: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.solicitacao = this.solicitacaoService.solicitacoes.find(
      solicitacao => solicitacao.id === id
    );
  }

  confirmarPagamento() {
    this.solicitacao.estado = 'PAGA';
    this.solicitacao.dataPagamento = new Date();

    this.router.navigate(['/home-cliente']);
  }
}