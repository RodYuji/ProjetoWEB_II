import { Service } from '@angular/core';

export type EstadoSolicitacao = 'ABERTA' | 'ORCADA' | 'REJEITADA' | 'APROVADA' | 'REDIRECIONADA' | 'ARRUMADA' | 'PAGA' | 'FINALIZADA';

export interface SolicitacaoAberta {
  id: number;
  data: string;
  hora: string;
  nomeCliente: string;
  descricao: string;
  estado: EstadoSolicitacao;
}

@Service()
export class Solicitacao {
  private solicitacoes: SolicitacaoAberta[] = [
    {
      id: 1,
      data: '01/08/2026',
      hora: '15:06',
      nomeCliente: 'Jose',
      descricao: 'Concerto de computador',
      estado: 'ABERTA'
    },
    {
      id: 2,
      data: '23/07/2026',
      hora: '18:59',
      nomeCliente: 'Arthur',
      descricao: 'Notebook não liga após queda, tela trincada e teclado com defeito',
      estado: 'ABERTA'
    },
    {
      id: 3,
      data: '23/08/2025',
      hora: '18:59',
      nomeCliente: 'Roberto',
      descricao: 'Falha na bateria',
      estado: 'FINALIZADA'
    }
  ];

  listarAbertas(): SolicitacaoAberta[] {
    return this.solicitacoes.filter(s => s.estado === 'ABERTA');
  }

  buscarPorId(id: number): SolicitacaoAberta | undefined {
    return this.solicitacoes.find(s => s.id === id);
  }
}