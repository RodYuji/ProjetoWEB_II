import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoManutencao } from '../../../shared/models/solicitacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-efetuar-manutencao',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css',
})
export class EfetuarManutencao {
  solicitacao: SolicitacaoManutencao | undefined;

  // RF014
  mostrarFormularioManutencao = false;
  descricaoManutencao = '';
  orientacoesCliente = '';

  // RF015
  mostrarFormularioRedirecionamento = false;
  funcionarioDestino = '';
  private funcionarioLogado = 'Arthur';
  funcionariosDisponiveis = ['Arthur', 'Rodrigo', this.funcionarioLogado].filter((funcionario) => funcionario !== this.funcionarioLogado);
  manutencaoConfirmada = false;
  redirecionamentoConfirmado = false;

  constructor(private route: ActivatedRoute, private router: Router, private solicitacaoService: SolicitacaoService) {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.buscarPorId(idNumero);
  }

  voltarParaLista(): void {
    this.router.navigate(['/visualizar-solicitacao']);
  }

  efetuarManutencao(): void {
    this.mostrarFormularioManutencao = true;
  }

  confirmarManutencao(): void {
    if (!this.solicitacao) return;

    this.solicitacao.descricaoManutencao = this.descricaoManutencao;
    this.solicitacao.orientacoesCliente = this.orientacoesCliente;
    this.solicitacao.dataHoraManutencao = new Date();
    this.solicitacao.funcionarioManutencao = this.funcionarioLogado;
    this.solicitacao.estado = 'ARRUMADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.manutencaoConfirmada = true;
  }

  redirecionarManutencao(): void {
    this.mostrarFormularioRedirecionamento = true;
  }

  confirmarRedirecionamento(): void {
    if (!this.solicitacao) return;

    this.solicitacao.funcionarioOrigemRedirecionamento = this.funcionarioLogado;
    this.solicitacao.funcionarioDestinoRedirecionamento = this.funcionarioDestino;
    this.solicitacao.dataHoraRedirecionamento = new Date();
    this.solicitacao.estado = 'REDIRECIONADA';
    this.solicitacaoService.atualizar(this.solicitacao);
    this.redirecionamentoConfirmado = true;
  }

  cancelarManutencao(): void {
    this.mostrarFormularioManutencao = false;
  }

  cancelarRedirecionamento(): void {
    this.mostrarFormularioRedirecionamento = false;
  }
}