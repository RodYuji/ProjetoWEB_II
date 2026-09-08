import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SolicitacaoManutencao } from '../models/solicitacao.model';

const STORAGE_KEY = 'solicitacoes';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
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

  adicionarSolicitacao(dados: Omit<SolicitacaoManutencao, 'id'>): SolicitacaoManutencao {
    const novaSolicitacao: SolicitacaoManutencao = {
      id: this.proximoId++,
      descricaoEquipamento: dados.descricaoEquipamento,
      estado: dados.estado,
      dataHora: dados.dataHora,
      categoriaEquipamento: dados.categoriaEquipamento,
      descricaoDefeito: dados.descricaoDefeito      
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