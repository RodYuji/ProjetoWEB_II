import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

@Component({
  selector: 'app-orcamento',
  imports: [],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.css',
})
export class Orcamento {

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

  aprovarServico() {
    this.solicitacao.status = 'APROVADA';
    this.router.navigate(['/home-cliente']);
  }

  rejeitarServico() {
    this.solicitacao.status = 'REJEITADA';
    this.router.navigate(['/home-cliente']);
  }
}