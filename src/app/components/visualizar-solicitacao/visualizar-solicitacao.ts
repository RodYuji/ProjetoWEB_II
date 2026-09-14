import { Component } from '@angular/core';
import { SolicitacaoService } from '../../shared/services/solicitacao.service';
import { SolicitacaoManutencao } from '../../shared/models/solicitacao.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TruncarTextoPipe } from '../../shared/pipes/truncar-texto-pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [RouterLink, DatePipe, TruncarTextoPipe, FormsModule],
  templateUrl: './visualizar-solicitacao.html',
  styleUrl: './visualizar-solicitacao.css',
})
export class VisualizarSolicitacao {  
  todasSolicitacoes: SolicitacaoManutencao[] = [];
  private funcionarioLogado = 'Arthur';

  filtro: string = 'TODAS';
  dataInicio: string = '';
  dataFim: string = '';
  solicitacoesFiltradas: SolicitacaoManutencao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {
    this.todasSolicitacoes = this.solicitacaoService.listar()
      .filter((s) => s.estado !== 'REDIRECIONADA' || s.funcionarioDestinoRedirecionamento === this.funcionarioLogado)
      .sort((a: SolicitacaoManutencao, b: SolicitacaoManutencao) => (a.dataHora.getTime() - b.dataHora.getTime()));
      this.aplicarFiltro();
  }

  corDoEstado(estado: string): string {
    switch (estado) {
      case 'ABERTA':
        return '#D3D3D3'; // cinza claro
      case 'ORÇADA':
        return '#C68642'; // marrom claro
      case 'REJEITADA':
        return '#F08080'; // vermelho claro
      case 'APROVADA':
        return '#FFFF99'; // amarelo claro
      case 'REDIRECIONADA':
        return '#D8BFD8'; // roxo claro
      case 'ARRUMADA':
        return '#ADD8E6'; // azul claro
      case 'PAGA':
        return '#FFD8A8'; // laranja claro
      case 'FINALIZADA':
        return '#90EE90'; // verde claro
      default:
        return '#FFFFFF'; // branco
    }
  }

  aplicarFiltro(): void {
    if (this.filtro === 'HOJE') {
      const hoje = new Date();
      this.solicitacoesFiltradas = this.todasSolicitacoes.filter((s) => s.dataHora.toDateString() === hoje.toDateString());
    } else if (this.filtro === 'PERIODO') {
      const inicio = new Date(this.dataInicio);
      const fim = new Date(this.dataFim);
      this.solicitacoesFiltradas = this.todasSolicitacoes.filter((s) => s.dataHora.getTime() >= inicio.getTime() && s.dataHora.getTime() <= fim.getTime());
    } else {
      this.solicitacoesFiltradas = this.todasSolicitacoes;
    }
  }

}
