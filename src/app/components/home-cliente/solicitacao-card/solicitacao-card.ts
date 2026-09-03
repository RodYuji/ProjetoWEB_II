import { Component, Input, Output, EventEmitter } from '@angular/core';

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

 @Output() detalhes = new EventEmitter<void>();

  verDetalhes() {
    // Lógica para exibir os detalhes da solicitação
    this.detalhes.emit();
  }
}
