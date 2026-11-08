import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolicitacaoCard } from './solicitacao-card/solicitacao-card';
import { SolicitacaoService } from '../../shared/services/solicitacao.service';
import { Solicitacao } from '../../shared/models/solicitacao.model';

@Component({
  selector: 'app-home-funcionario',
  imports: [RouterLink, SolicitacaoCard],
  templateUrl: './home-funcionario.html',
  styleUrl: './home-funcionario.css',
})
export class HomeFuncionario implements OnInit {

  // RF011 - solicitações ABERTAS (signal: a tela atualiza quando a API responde)
  solicitacoesAbertas = signal<Solicitacao[]>([]);

  private solicitacaoService = inject(SolicitacaoService);

  ngOnInit(): void {
    this.listarAbertas();
  }

  listarAbertas(): void {
    this.solicitacaoService.listarAbertas().subscribe({
      next: (dados: Solicitacao[]) => {
        if (dados == null) {
          this.solicitacoesAbertas.set([]);
        } else {
          this.solicitacoesAbertas.set(dados);
        }
      }
    });
  }
}