import { Component, inject } from '@angular/core';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { Solicitacao } from '../../shared/services/solicitacao';

@Component({
  selector: 'app-home-funcionario',
  imports: [SolicitacaoCard],
  templateUrl: './home-funcionario.html',
  styleUrl: './home-funcionario.css',
})
export class HomeFuncionario {
  private solicitacaoService = inject(Solicitacao);
  solicitacoesAbertas = this.solicitacaoService.listarAbertas();
}