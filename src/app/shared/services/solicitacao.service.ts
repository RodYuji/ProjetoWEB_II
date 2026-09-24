import { Injectable } from '@angular/core';
import { SolicitacaoManutencao } from '../models/solicitacao.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private proximoId = 21;

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
      valorOrcamento: 420.00,
      historico: [
        { dataHora: new Date('2026-08-06T16:20:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-06T17:00:00'), estado: 'PAGA' }
      ]
    },
    {
      id: 7,
      descricaoEquipamento: 'Desktop com falha no processador',
      categoriaEquipamento: 'Desktop',
      descricaoDefeito: 'processador falhando',
      dataHora: new Date('2026-08-09T09:15:00'),
      estado: 'PAGA',
      nomeCliente: 'Clara',
      valorOrcamento: 680.00,
      historico: [
        { dataHora: new Date('2026-08-09T09:15:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-09T11:00:00'), estado: 'PAGA' }
      ]
    },
        {
      id: 8,
      descricaoEquipamento: 'impressora sem tinta',
      categoriaEquipamento: 'Impressora',
      descricaoDefeito: 'sem tinta',
      dataHora: new Date('2026-08-07T10:00:00'),
      estado: 'ABERTA',
      nomeCliente: 'Carlos',
      historico: [
        { dataHora: new Date('2026-08-07T10:00:00'), estado: 'ABERTA' }
      ]
    },
    {
      id: 9,
      descricaoEquipamento: 'monitor com risco na tela',
      categoriaEquipamento: 'Monitor',
      descricaoDefeito: 'risco na tela',
      dataHora: new Date('2026-08-08T11:00:00'),
      estado: 'ABERTA',
      nomeCliente: 'Gabriel',
      historico: [
        { dataHora: new Date('2026-08-08T11:00:00'), estado: 'ABERTA' }
      ]
    },
    {
      id: 10,
      descricaoEquipamento: 'pc não liga direito',
      categoriaEquipamento: 'Desktop',
      descricaoDefeito: 'não liga direito',
      dataHora: new Date('2026-08-08T13:00:00'),
      estado: 'ORÇADA',
      nomeCliente: 'Fernando',
      historico: [
        { dataHora: new Date('2026-08-08T13:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-08T15:00:00'), estado: 'ORÇADA' }
      ]
    },
    {
      id: 11,
      descricaoEquipamento: 'notebook lento demais',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'muito lento',
      dataHora: new Date('2026-08-09T14:00:00'),
      estado: 'ORÇADA',
      nomeCliente: 'Rodrigo',
      historico: [
        { dataHora: new Date('2026-08-09T14:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-09T16:00:00'), estado: 'ORÇADA' }
      ]
    },
    {
      id: 12,
      descricaoEquipamento: 'teclado com tecla presa',
      categoriaEquipamento: 'Teclado',
      descricaoDefeito: 'tecla presa',
      dataHora: new Date('2026-08-09T15:30:00'),
      estado: 'APROVADA',
      nomeCliente: 'Carlos',
      historico: [
        { dataHora: new Date('2026-08-09T15:30:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-09T18:00:00'), estado: 'APROVADA' }
      ]
    },
    {
      id: 13,
      descricaoEquipamento: 'monitor piscando',
      categoriaEquipamento: 'Monitor',
      descricaoDefeito: 'tela piscando',
      dataHora: new Date('2026-08-10T09:30:00'),
      estado: 'APROVADA',
      nomeCliente: 'Gabriel',
      historico: [
        { dataHora: new Date('2026-08-10T09:30:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-10T12:00:00'), estado: 'APROVADA' }
      ]
    },
    {
      id: 14,
      descricaoEquipamento: 'pc reiniciando do nada',
      categoriaEquipamento: 'Desktop',
      descricaoDefeito: 'reinicia sozinho',
      dataHora: new Date('2026-08-10T16:00:00'),
      estado: 'REJEITADA',
      nomeCliente: 'Fernando',
      historico: [
        { dataHora: new Date('2026-08-10T16:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-10T17:00:00'), estado: 'REJEITADA' }
      ]
    },
    {
      id: 15,
      descricaoEquipamento: 'notebook com tela azul',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'tela azul',
      dataHora: new Date('2026-08-11T10:00:00'),
      estado: 'REDIRECIONADA',
      nomeCliente: 'Rodrigo',
      funcionarioOrigemRedirecionamento: 'Arthur',
      funcionarioDestinoRedirecionamento: 'Yumi',
      dataHoraRedirecionamento: new Date('2026-08-11T16:00:00'),
      historico: [
        { dataHora: new Date('2026-08-11T10:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-11T16:00:00'), estado: 'REDIRECIONADA' }
      ]
    },
    {
      id: 16,
      descricaoEquipamento: 'mouse não funciona',
      categoriaEquipamento: 'Mouse',
      descricaoDefeito: 'não funciona',
      dataHora: new Date('2026-08-12T11:00:00'),
      estado: 'REDIRECIONADA',
      nomeCliente: 'Carlos',
      funcionarioOrigemRedirecionamento: 'Yumi',
      funcionarioDestinoRedirecionamento: 'Arthur',
      dataHoraRedirecionamento: new Date('2026-08-12T17:00:00'),
      historico: [
        { dataHora: new Date('2026-08-12T11:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-12T17:00:00'), estado: 'REDIRECIONADA' }
      ]
    },
    {
      id: 17,
      descricaoEquipamento: 'impressora atolando papel',
      categoriaEquipamento: 'Impressora',
      descricaoDefeito: 'atola papel',
      dataHora: new Date('2026-08-13T08:30:00'),
      estado: 'ARRUMADA',
      nomeCliente: 'Gabriel',
      historico: [
        { dataHora: new Date('2026-08-13T08:30:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-13T12:00:00'), estado: 'ARRUMADA' }
      ]
    },
    {
      id: 18,
      descricaoEquipamento: 'notebook esquentando muito',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'esquenta muito',
      dataHora: new Date('2026-08-13T14:00:00'),
      estado: 'ARRUMADA',
      nomeCliente: 'Fernando',
      historico: [
        { dataHora: new Date('2026-08-13T14:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-13T17:00:00'), estado: 'ARRUMADA' }
      ]
    },
    {
      id: 19,
      descricaoEquipamento: 'desktop sem imagem no monitor',
      categoriaEquipamento: 'Desktop',
      descricaoDefeito: 'sem imagem',
      dataHora: new Date('2026-08-14T09:00:00'),
      estado: 'PAGA',
      nomeCliente: 'Rodrigo',
      historico: [
        { dataHora: new Date('2026-08-14T09:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-14T13:00:00'), estado: 'PAGA' }
      ]
    },
    {
      id: 20,
      descricaoEquipamento: 'notebook não desliga',
      categoriaEquipamento: 'Notebook',
      descricaoDefeito: 'não desliga',
      dataHora: new Date('2026-08-15T10:00:00'),
      estado: 'FINALIZADA',
      nomeCliente: 'Carlos',
      historico: [
        { dataHora: new Date('2026-08-15T10:00:00'), estado: 'ABERTA' },
        { dataHora: new Date('2026-08-15T15:00:00'), estado: 'FINALIZADA' }
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
