import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoManutencao } from '../../../shared/models/solicitacao.model';
import { ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-efetuar-manutencao',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css',
})
export class EfetuarManutencao implements OnInit {
  solicitacao: SolicitacaoManutencao | undefined;

  // RF014
  mostrarFormularioManutencao = false;
  descricaoManutencao = '';
  orientacoesCliente = '';

  // RF015
  mostrarFormularioRedirecionamento = false;
  funcionarioDestino = '';
  private funcionarioLogado = 'Arthur';
  funcionariosDisponiveis: Funcionario[] = [];
  manutencaoConfirmada = false;
  redirecionamentoConfirmado = false;

  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private funcionarioService: FuncionarioService) {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.buscarPorId(idNumero);
  }

  ngOnInit(): void {
    this.funcionariosDisponiveis = this.funcionarioService.listar().filter((funcionario) => funcionario.nome !== this.funcionarioLogado);
  }

  efetuarManutencao(): void {
    this.mostrarFormularioManutencao = true;
  }

  confirmarManutencao(): void {
    if (!this.solicitacao) return;

    this.solicitacao.historico.push({
      dataHora: new Date(),
      estado: 'ARRUMADA',
      funcionarioOrigemManutencao: this.funcionarioLogado,
    });

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

    this.solicitacao.historico.push({
      dataHora: new Date(),
      estado: 'REDIRECIONADA',
      funcionarioOrigemManutencao: this.funcionarioLogado,
      funcionarioDestinoManutencao: this.funcionarioDestino,
    });

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