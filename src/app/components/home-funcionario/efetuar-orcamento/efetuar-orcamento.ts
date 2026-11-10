import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MoedaPipe } from '../../../shared/pipes/moeda-pipe';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-efetuar-orcamento',
  imports: [FormsModule, DatePipe, RouterLink, MoedaPipe],
  templateUrl: './efetuar-orcamento.html',
  styleUrl: './efetuar-orcamento.css',
})
export class EfetuarOrcamento implements OnInit {

  // Id do usuário logado (vem do login)
  private loginService = inject(LoginService);
  idFuncionario = this.loginService.usuarioLogado?.id ?? 0;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);

  // solicitação carregada da API
  solicitacao = signal<Solicitacao | null>(null);
  valorOrcamento: number | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (dados: Solicitacao) => this.solicitacao.set(dados),
      error: () => this.solicitacao.set(null)
    });
  }

  // ABERTA -> ORÇADA 
  confirmarOrcamento(): void {
    const s = this.solicitacao();
    if (s == null || this.valorOrcamento == null) return;

    this.solicitacaoService.orcar(s.id, this.valorOrcamento, this.idFuncionario).subscribe({
      next: () => {
        alert('Orçamento confirmado com sucesso!');
        this.router.navigate(['/home-funcionario']);
      },
      error: (erro) => {
        if (erro.status === 409) {
          alert('Esta solicitação não está mais ABERTA.');
        } else {
          alert('Não foi possível registrar o orçamento.');
        }
      }
    });
  }
}