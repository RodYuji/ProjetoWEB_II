import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClock,
  faFileInvoiceDollar,
  faCircleCheck,
  faCircleXmark,
  faScrewdriverWrench,
  faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

@Component({
  selector: 'app-solicitacao-card',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {
  @Input() equipamento = '';
  @Input() dataHora!: Date;
  @Input() estado = '';
  @Input() solicitacaoId: number = 0;

  @Output() detalhes = new EventEmitter<void>();
  @Output() orcamento = new EventEmitter<void>();
  @Output() pagamento = new EventEmitter<void>();

  faClock = faClock;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faScrewdriverWrench = faScrewdriverWrench;
  faMoneyCheckDollar = faMoneyCheckDollar;

  constructor(private solicitacaoService: SolicitacaoService) {}

  verPagamento() {
    this.pagamento.emit();
  }

  verOrcamento() {
    this.orcamento.emit();
  }

  verDetalhes() {
    this.detalhes.emit();
  }

  descricaoEquipamento() {
    if (this.equipamento.length > 30) {
      return this.equipamento.substring(0, 30) + '...';
    }

    return this.equipamento;
  }

  textoEstado() {
    if (this.estado === 'ARRUMADA') {
      return 'Arrumada - Aguardando Pagamento';
    }

    return this.estado;
  }

  resgatarServico(): void {
    const solicitacao = this.solicitacaoService.buscarPorId(this.solicitacaoId);

    if (solicitacao) {
      solicitacao.estado = 'ABERTA';
    }
  }
}