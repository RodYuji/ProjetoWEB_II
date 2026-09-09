import { Component, Input } from '@angular/core';
import { SolicitacaoAberta } from '../../../shared/services/solicitacao';
import { TruncarTextoPipe } from '../../../shared/pipes/truncar-texto-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-solicitacao-card',
  imports: [TruncarTextoPipe, RouterLink],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {
  @Input() solicitacao!: SolicitacaoAberta;
}
