import { Component, input, Input } from '@angular/core';

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

  verDetalhes() {
    // Lógica para exibir os detalhes da solicitação
    console.log('Exibindo detalhes da solicitação:', this.titulo);
  }
}
