import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
solicitacoes = [
    {
      id: 1,
      descricao: 'notebook dell nao liga',
      equipamento: 'notebook dell',
      categoria: 'notebook',
      defeito: 'nao liga',
      data: '2023-06-01',
      hora: '14:30',
      status: 'ABERTA',
    },
     {
      id: 2,
    descricao: 'Impressora com problema',
    equipamento: 'Impressora HP',
    categoria: 'impressora',
    defeito: 'problema',
    data: '19/08/2026',
    hora: '10:00',
    status: 'ORÇADA'
  },
  {
    id: 3,
    descricao: 'Monitor com tela quebrada',
    equipamento: 'Monitor Samsung',
    categoria: 'monitor',
    defeito: 'tela quebrada',
    data: '20/08/2026',
    hora: '09:15',
    status: 'REJEITADA'
  },
  {
    id: 4,
    descricao: 'Computador não inicia',
    equipamento: 'Desktop Dell',
    categoria: 'computador',
    defeito: 'não inicia',
    data: '21/08/2026',
    hora: '16:45',
    status: 'ARRUMADA',
    valor: 250.00,
    dataPagamento: null,
    horaPagamento: null
  }
  ];
}