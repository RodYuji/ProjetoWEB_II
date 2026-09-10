import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

@Component({
  selector: 'app-pagamento',
  imports: [],
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
    this.solicitacao.status = 'PAGA';
    this.solicitacao.dataPagamento = new Date();

    this.router.navigate(['/']);
  }
}