import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orcamento',
  imports: [DatePipe, RouterLink],
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
    this.solicitacao.estado = 'APROVADA';
    alert('Serviço aprovado com sucesso!');
    this.router.navigate(['/home-cliente']);
  }

  rejeitarServico() {
    this.solicitacao.estado = 'REJEITADA';
  alert("Serviço recusado com sucesso!");
    this.router.navigate(['/home-cliente']);
  }
}