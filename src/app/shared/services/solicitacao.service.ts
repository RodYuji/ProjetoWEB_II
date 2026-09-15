import { Injectable } from '@angular/core';
import { SolicitacaoManutencao } from '../models/solicitacao.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private proximoId = 7;

  solicitacoes: SolicitacaoManutencao[] = [
    {
      id: 1,
      descricaoEquipamento: 'Notebook não liga de jeito nenhum',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'não liga',
      dataHora: new Date('2026-08-01T09:00:00'),
      estado: 'ABERTA',
      nomeCliente: 'Gabriel',
      historico: [
        { dataHora: new Date('2026-08-01T09:00:00'), estado: 'ABERTA' }
      ]
    },
    {
      id: 2,
      descricaoEquipamento: 'Impressora imprimindo com falhas',
      categoriaEquipamento: 'Impressora',
      descricaoDefeito: 'falhas de impressão',
      dataHora: new Date('2026-08-02T10:30:00'),
      estado: 'ORÇADA',
      nomeCliente: 'Fernando',
      valorOrcamento: 150.00,
      historico: [
        { dataHora: new Date('2026-08-02T10:30:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-02T12:00:00'), estado: 'ORÇADA' }
      ]
    },
    {
      id: 3,
      descricaoEquipamento: 'Mouse com botão esquerdo travando',
      categoriaEquipamento: 'Mouse',
      descricaoDefeito: 'botão travando',
      dataHora: new Date('2026-08-03T14:00:00'),
      estado: 'ABERTA',
      nomeCliente: 'Carlos',
      historico: [
        { dataHora: new Date('2026-08-03T14:00:00'), estado: 'ABERTA' }
      ]
    },
    {
      id: 4,
      descricaoEquipamento: 'Teclado com teclas não respondendo',
      categoriaEquipamento: 'Teclado',
      descricaoDefeito: 'teclas não respondem',
      dataHora: new Date('2026-08-04T08:15:00'),
      estado: 'ARRUMADA',
      nomeCliente: 'Rodrigo',
      valorOrcamento: 80.00,
      historico: [
        { dataHora: new Date('2026-08-04T08:15:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-04T10:00:00'), estado: 'ARRUMADA' }
      ]
    },
    {
      id: 5,
      descricaoEquipamento: 'Computador reiniciando sozinho',
      categoriaEquipamento: 'Desktop',
      descricaoDefeito: 'reinicia sozinho',
      dataHora: new Date('2026-08-05T11:45:00'),
      estado: 'REJEITADA',
      nomeCliente: 'Gabriel',
      historico: [
        { dataHora: new Date('2026-08-05T11:45:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-05T12:00:00'), estado: 'REJEITADA' }
      ]
    },
    {
      id: 6,
      descricaoEquipamento: 'Tela com listras coloridas',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'tela com defeito',
      dataHora: new Date('2026-08-06T16:20:00'),
      estado: 'PAGA',
      nomeCliente: 'Fernando',
      historico: [
        { dataHora: new Date('2026-08-06T16:20:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-06T17:00:00'), estado: 'PAGA' }
      ]
    },
  ];

  listar(): SolicitacaoManutencao[] {
    return this.solicitacoes;
  }

  buscarPorId(id: number): SolicitacaoManutencao | undefined {
    return this.solicitacoes.find(s => s.id === id);
  }

 adicionarSolicitacao(dados: Omit<SolicitacaoManutencao, 'id' | 'historico'>): SolicitacaoManutencao {
    const novaSolicitacao: SolicitacaoManutencao= {
      id: this.proximoId++,
      descricaoEquipamento:dados.descricaoEquipamento,
      categoriaEquipamento:dados.categoriaEquipamento,
      descricaoDefeito:dados.descricaoDefeito,
      dataHora: dados.dataHora,
      estado: dados.estado,
      nomeCliente: dados.nomeCliente,
      historico: [
  {
    estado: dados.estado,
    dataHora: dados.dataHora
  }
]
    };
    this.solicitacoes.push(novaSolicitacao);
    return novaSolicitacao;
  }

  atualizar(solicitacao: SolicitacaoManutencao): void {
  this.solicitacoes.forEach((obj, index, objs) => {
    if (solicitacao.id === obj.id) {

      if (obj.estado !== solicitacao.estado) {
        solicitacao.historico.push({
          estado: solicitacao.estado,
          dataHora: new Date()
        });
      }

      objs[index] = solicitacao;
    }
  });
}
}
