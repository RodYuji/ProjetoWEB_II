import { Component } from '@angular/core';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { SolicitacaoService } from '../../shared/services/solicitacao-cliente.service';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-home-funcionario',
  imports: [SolicitacaoCard],
  templateUrl: './home-funcionario.html',
  styleUrl: './home-funcionario.css',
})

export class HomeFuncionario {
  solicitacoesAbertas: SolicitacaoManutencao[];

  constructor(private solicitacaoService: SolicitacaoService) {
    this.solicitacoesAbertas = this.solicitacaoService.listar().filter((solicitacao) => solicitacao.estado === 'ABERTA');
  }
}