import { Component } from '@angular/core';
import { SolicitacaoCard } from '../solicitacao-card/solicitacao-card';

export interface SolicitacaoAberta {
  data: string;
  hora: string;
  nomeCliente: string;
  descricao: string;
}

@Component({
  selector: 'app-home-funcionario',
  imports: [SolicitacaoCard],
  templateUrl: './home-funcionario.html',
  styleUrl: './home-funcionario.css',
})

export class HomeFuncionario {
  solicitacoesAbertas: SolicitacaoAberta[] = [
    {
      data: '01/08/2026',
      hora: '15:06',
      nomeCliente: 'Jose',
      descricao: 'Concerto de computador'
    },
    {
      data: '23/07/2026',
      hora: '18:59',
      nomeCliente: 'Arthur',
      descricao: 'Concerto de notebook, placa'
    }
  ]
}

