import { Component } from '@angular/core';

interface SolicitacaoAberta {
  data: string;
  hora: string;
  nomeCliente: string;
  descricao: string;
}

@Component({
  selector: 'app-home-funcionario',
  imports: [],
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
    }
  ]
}

