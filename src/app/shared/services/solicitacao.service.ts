import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  // Status da solicitação:
// ABERTA: solicitação criada e aguardando atendimento.
// ORÇADA: orçamento foi criado e aguarda decisão do cliente.
// APROVADA: cliente aceitou o orçamento e o serviço será realizado.
// REJEITADA: cliente recusou o orçamento.
// CONCLUÍDA: serviço foi realizado e aguarda pagamento.
// PAGA: pagamento do serviço foi realizado.

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
    status: 'ORÇADA',
    valor: 150.00
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
    status: 'CONCLUÍDA',
    valor: 200.00
  },
  {
    id: 5,
    descricao: 'Problema com periférico',
    equipamento: 'Teclado Logitech',
    categoria: 'periférico',
    defeito: 'não funciona',
    data: '22/08/2026',
    hora: '11:30',
    status: 'APROVADA'
  },
  {
    id: 6,
    descricao: 'Outro problema',
    equipamento: 'Outro equipamento',
    categoria: 'outro',
    defeito: 'problema desconhecido',
    data: '23/08/2026',
    hora: '14:00',
    status: 'PAGA'
  }
  ];
}
