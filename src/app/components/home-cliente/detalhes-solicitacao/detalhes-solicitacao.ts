import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes-solicitacao',
  imports: [DatePipe],
  templateUrl: './detalhes-solicitacao.html',
  styleUrl: './detalhes-solicitacao.css',
})
export class DetalhesSolicitacao {
  solicitacao: any;
  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService) {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.solicitacoes.find(solicitacao => solicitacao.id === idNumero);
  }
}
