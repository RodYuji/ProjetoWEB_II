import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';

const STORAGE_KEY = 'solicitacoes';

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
/*
solicitacoes = [
    {
      id: 1,
      descricaoEquipamento: 'notebook dell nao liga',
      equipamento: 'notebook dell',
      categoria: 'notebook',
      defeito: 'nao liga',
      data: '2023-06-01',
      hora: '14:30',
      estado: 'ABERTA',
    },
     {
      id: 2,
    descricaoEquipamento: 'Impressora com problema',
    equipamento: 'Impressora HP',
    categoria: 'impressora',
    defeito: 'problema',
    data: '19/08/2026',
    hora: '10:00',
    estado: 'ORÇADA',
    valor: 150.00
  },
  {
    id: 3,
    descricaoEquipamento: 'Monitor com tela quebrada',
    equipamento: 'Monitor Samsung',
    categoria: 'monitor',
    defeito: 'tela quebrada',
    data: '20/08/2026',
    hora: '09:15',
    estado: 'REJEITADA'
  },
  {
    id: 4,
    descricaoEquipamento: 'Computador não inicia',
    equipamento: 'Desktop Dell',
    categoria: 'computador',
    defeito: 'não inicia',
    data: '21/08/2026',
    hora: '16:45',
    estado: 'CONCLUÍDA',
    valor: 200.00
  },
  {
    id: 5,
    descricaoEquipamento: 'Problema com periférico',
    equipamento: 'Teclado Logitech',
    categoria: 'periférico',
    defeito: 'não funciona',
    data: '22/08/2026',
    hora: '11:30',
    estado: 'APROVADA'
  },
  {
    id: 6,
    descricaoEquipamento: 'Outro problema',
    equipamento: 'Outro equipamento',
    categoria: 'outro',
    defeito: 'problema desconhecido',
    data: '23/08/2026',
    hora: '14:00',
    estado: 'PAGA'
}]
*/

  private proximoId = 1;
  solicitacoes: SolicitacaoManutencao[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.carregarDoStorage();
    }
  }

  listar(): SolicitacaoManutencao[] {
    return this.solicitacoes;
  }

  buscarPorId(id: number): SolicitacaoManutencao | undefined {
    return this.solicitacoes.find(s => s.id === id);
  }

  atualizar(solicitacao: SolicitacaoManutencao): void {
    this.solicitacoes.forEach((obj, index, objs) => {
      if (solicitacao.id === obj.id) {
        objs[index] = solicitacao;
      }
    });
    this.salvarNoStorage();
  }

  adicionarSolicitacao(dados: Omit<SolicitacaoManutencao, 'id'>): SolicitacaoManutencao {
    const novaSolicitacao: SolicitacaoManutencao = {
      id: this.proximoId++,
      ...dados,
    };
    this.solicitacoes.push(novaSolicitacao);
    this.salvarNoStorage();
    return novaSolicitacao;
  }

  private salvarNoStorage(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.solicitacoes));
  }

  private carregarDoStorage(): void {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return;

    this.solicitacoes = JSON.parse(dados).map((s: SolicitacaoManutencao) => ({
      ...s,
      dataHora: new Date(s.dataHora),
    }));

    this.proximoId = this.solicitacoes.reduce((max, s) => Math.max(max, s.id), 0) + 1;
  }
}
