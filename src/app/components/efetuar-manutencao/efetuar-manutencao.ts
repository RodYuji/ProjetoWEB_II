import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';
import { ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../shared/services/solicitacao-cliente.service';

@Component({
  selector: 'app-efetuar-manutencao',
  imports: [FormsModule],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css',
})
export class EfetuarManutencao {
  solicitacao: SolicitacaoManutencao | undefined;

  mostrarFormularioManutencao = false;
  descricaoManutencao = '';
  orientacoesCliente = '';

  constructor(
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.buscarPorId(idNumero);
  }

  efetuarManutencao(): void {
    this.mostrarFormularioManutencao = true;
  }

  confirmarManutencao(): void {
    if (!this.solicitacao) return;

    this.solicitacao.descricaoManutencao = this.descricaoManutencao;
    this.solicitacao.orientacoesCliente = this.orientacoesCliente;
    this.solicitacao.dataHoraManutencao = new Date();
    this.solicitacao.funcionarioManutencao = 'Funcionário Teste'; // TODO: login (RF002)
    this.solicitacao.estado = 'ARRUMADA';

    this.solicitacaoService.atualizar(this.solicitacao);
  }
}