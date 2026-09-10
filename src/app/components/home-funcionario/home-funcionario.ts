import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
//import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
//import { SolicitacaoService } from '../../shared/services/solicitacao.service';
//import { SolicitacaoManutencao } from '../../shared/models/solicitacao.model';


@Component({
  selector: 'app-home-funcionario',
  imports: [RouterLink],
  templateUrl: './home-funcionario.html',
  styleUrl: './home-funcionario.css',
})

export class HomeFuncionario {
/*
  solicitacoesAbertas: SolicitacaoManutencao[];
  constructor(private solicitacaoService: SolicitacaoService) {
    this.solicitacoesAbertas = this.solicitacaoService.listar().filter((solicitacao) => solicitacao.estado === 'ABERTA');
  }
  */
}