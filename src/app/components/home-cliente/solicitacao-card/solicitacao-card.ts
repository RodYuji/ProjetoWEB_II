import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao-card',
  imports: [],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {
  @Input() titulo = '';
  @Input() equipamento = '';
  @Input() data = '';
  @Input() status = '';
  @Input() hora = '';
  @Input() solicitacaoId: number = 0;

 @Output() detalhes = new EventEmitter<void>();

  constructor(private router: Router) {}

  verDetalhes() {
    // Lógica para exibir os detalhes da solicitação
    this.detalhes.emit();
  }

  pagarServico() {
    this.router.navigate(['/pagar-servico', this.solicitacaoId]);
  }
}
