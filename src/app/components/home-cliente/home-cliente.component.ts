import { Component } from '@angular/core';
import {SolicitacaoCard} from "./solicitacao-card/solicitacao-card";
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard, RouterLink],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {
  solicitacoes: any[] = [];
  constructor(private router: Router,private solicitacaoService: SolicitacaoService
) {
  this.solicitacoes = this.solicitacaoService.solicitacoes;
}

  verDetalhes(solicitacao: any) {
    this.router.navigate(['/detalhes-solicitacao', solicitacao.id]);
  }
}