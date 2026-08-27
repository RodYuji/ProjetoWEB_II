import { Component, Input } from '@angular/core';
import { SolicitacaoAberta } from '../home-funcionario/home-funcionario'

@Component({
  selector: 'app-solicitacao-card',
  imports: [],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {
  @Input() solicitacao!: SolicitacaoAberta;
}
