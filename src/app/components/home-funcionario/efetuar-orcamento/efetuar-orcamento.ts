import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { SolicitacaoManutencao } from '../../../shared/models/solicitacao.model';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-efetuar-orcamento',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './efetuar-orcamento.html',
  styleUrl: './efetuar-orcamento.css',
})

export class EfetuarOrcamento {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);
  solicitacao: SolicitacaoManutencao | undefined;
  valorOrcamento: number | undefined;
  orcamentoConfirmado = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.buscarPorId(idNumero);
  }

  confirmarOrcamento(): void {
  if (!this.solicitacao) return;

  this.solicitacao.dataHoraOrcamento = new Date();
  this.solicitacao.funcionarioOrcamento = 'Arthur';
  this.solicitacao.valorOrcamento = this.valorOrcamento;
  this.solicitacao.estado = 'ORÇADA';
  this.orcamentoConfirmado = true;

  this.solicitacaoService.atualizar(this.solicitacao);
  this.solicitacao.historico.push({ 
    dataHora: new Date(),
    estado: 'ORÇADA',
  });
  alert('Orçamento confirmado com sucesso!');
  this.router.navigate(['/home-funcionario']);
}

  editarOrcamento():void {
    this.orcamentoConfirmado = false;
  }
}
