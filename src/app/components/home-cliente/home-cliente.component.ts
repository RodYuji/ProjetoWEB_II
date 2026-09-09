import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard, RouterLink, DatePipe],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {
  private solicitacaoService = inject(SolicitacaoService);
  private router = inject(Router);

  solicitacoes: SolicitacaoManutencao[] = this.solicitacaoService.listar();

  constructor() {
  console.log('Solicitações na Home:', this.solicitacoes);
}

  verDetalhes(solicitacao: SolicitacaoManutencao): void {
    this.router.navigate(['/detalhes-solicitacao', solicitacao.id]);
  }
}