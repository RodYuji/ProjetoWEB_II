import { Component, Input } from '@angular/core';
import { TruncarTextoPipe } from '../../../shared/pipes/truncar-texto-pipe';
import { RouterLink } from "@angular/router";
import { SolicitacaoManutencao } from '../../../shared/models/solicitacao.model';

@Component({
  selector: 'app-solicitacao-card',
  imports: [TruncarTextoPipe, RouterLink],
  templateUrl: './solicitacao-card.html',
  styleUrl: './solicitacao-card.css',
})
export class SolicitacaoCard {

  @Input() solicitacao!: SolicitacaoManutencao;
  
}