import { Component, Input } from '@angular/core';
import { TruncarTextoPipe } from '../../../shared/pipes/truncar-texto-pipe';
import { RouterLink } from "@angular/router";

type SolicitacaoAberta = any;

@Component({
  selector: 'app-solicitacao-card',
  imports: [TruncarTextoPipe, RouterLink],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {
  @Input() solicitacao!: SolicitacaoAberta;
}
