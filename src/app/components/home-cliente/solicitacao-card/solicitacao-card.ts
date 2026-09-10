import { Component, Input, Output, EventEmitter } from '@angular/core';
/*import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faClock,faFileInvoiceDollar,faCircleCheck,faCircleXmark,faScrewdriverWrench,faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons';*/

import { Router } from '@angular/router';
import { PagarServico } from '../pagar-servico/pagar-servico';

@Component({
  selector: 'app-solicitacao-card',
  imports: [/*FontAwesomeModule*/],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {

  @Input() equipamento = '';
  @Input() descricaoEquipamento = '';
  @Input() descricaoDefeito = '';
  @Input() data = '';
  @Input() status = '';
  @Input() hora = '';
  @Input() solicitacaoId: number = 0;

  @Output() detalhes = new EventEmitter<void>();
  @Output() orcamento = new EventEmitter<void>();
  @Output() pagamento = new EventEmitter<void>();

/*
  faClock = faClock;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faScrewdriverWrench = faScrewdriverWrench;
  faMoneyCheckDollar = faMoneyCheckDollar;
*/

verPagamento() {
  console.log('CLIQUEI NO BOTÃO');
  this.pagamento.emit();
  console.log('EVENTO PAGAMENTO EMITIDO');
}

/*  verOrcamento() {
    // Lógica para exibir o orçamento da solicitação
    this.orcamento.emit();
  }
 */
  constructor(private router: Router) {}

  verDetalhes() {
    // Lógica para exibir os detalhes da solicitação
    this.detalhes.emit();
  }

  descricaoDoEquipamento(){
    if (this.descricaoEquipamento.length > 30) {
      return this.descricaoEquipamento.substring(0, 30) + '...';
    }
    return this.descricaoEquipamento;
  }
  textoStatus() {
    if(this.status === 'CONCLUÍDA') {
      return 'Concluída - Aguardando Pagamento';
    }
    return this.status;
  }
  pagarServico(){
    this.router.navigate(['/pagar-servico', this.solicitacaoId]);
  }
}
