import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { TruncarTextoPipe } from '../../../shared/pipes/truncar-texto-pipe';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-visualizar-solicitacao',
  imports: [RouterLink, DatePipe, TruncarTextoPipe, FormsModule],
  templateUrl: './visualizar-solicitacao.html',
  styleUrl: './visualizar-solicitacao.css',
})
export class VisualizarSolicitacao implements OnInit {

  // trocar pelo id do funcionário logado quando o login estiver integrado e apagar comentário
  // Id do usuário logado (vem do login)
  private loginService = inject(LoginService);
  idFuncionario = this.loginService.usuarioLogado?.id ?? 0;

  private solicitacaoService = inject(SolicitacaoService);

  filtro: string = 'TODAS';
  dataInicio: string = '';
  dataFim: string = '';

  // lista já filtrada e ordenada pelo back-end
  solicitacoesFiltradas = signal<Solicitacao[]>([]);

  ngOnInit(): void {
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

  // TODAS, HOJE ou PERÍODO 
  aplicarFiltro(): void {
    let consulta: Observable<Solicitacao[]>;

    if (this.filtro === 'HOJE') {
      const hoje = this.dataDeHoje();
      consulta = this.solicitacaoService.listarPorPeriodo(this.idFuncionario, hoje, hoje);
    } else if (this.filtro === 'PERIODO' && this.dataInicio !== '' && this.dataFim !== '') {
      consulta = this.solicitacaoService.listarPorPeriodo(this.idFuncionario, this.dataInicio, this.dataFim);
    } else {
      consulta = this.solicitacaoService.listarTodas(this.idFuncionario);
    }

    consulta.subscribe({
      next: (dados: Solicitacao[]) => this.solicitacoesFiltradas.set(dados == null ? [] : dados),
      error: () => alert('Erro ao carregar as solicitações.')
    });
  }

  // PAGA -> FINALIZADA 
  finalizarSolicitacao(solicitacao: Solicitacao): void {
    if (!confirm('Deseja finalizar a solicitação Nº ' + solicitacao.id + '?')) {
      return;
    }
    this.solicitacaoService.finalizar(solicitacao.id, this.idFuncionario).subscribe({
      next: () => this.aplicarFiltro(),
      error: () => alert('Não foi possível finalizar a solicitação.')
    });
  }

  // formato aaaa-mm-dd
  private dataDeHoje(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + mes + '-' + dia;
  }
}