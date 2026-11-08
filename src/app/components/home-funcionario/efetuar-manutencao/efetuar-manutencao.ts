import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { HistoricoService } from '../../../shared/services/historico.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Historico } from '../../../shared/models/historico.model';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-efetuar-manutencao',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css',
})
export class EfetuarManutencao implements OnInit {

  // trocar pelo id do funcionário logado quando o login estiver integrado e apagar comentário
  // Id do usuário logado (vem do login)
  private loginService = inject(LoginService);
  idFuncionario = this.loginService.usuarioLogado?.id ?? 0;

  private route = inject(ActivatedRoute);
  private solicitacaoService = inject(SolicitacaoService);
  private funcionarioService = inject(FuncionarioService);
  private historicoService = inject(HistoricoService);

  // Dados carregados da API - com signals a tela atualiza quando a API responde
  solicitacao = signal<Solicitacao | null>(null);
  historico = signal<Historico[]>([]);
  funcionariosDisponiveis = signal<Funcionario[]>([]);

  
  mostrarFormularioManutencao = false;
  descricaoManutencao = '';
  orientacoesCliente = '';
  manutencaoConfirmada = false;

  mostrarFormularioRedirecionamento = false;
  idFuncionarioDestino = 0;
  redirecionamentoConfirmado = false;

  ngOnInit(): void {
    this.carregar(Number(this.route.snapshot.paramMap.get('id')));

    // não pode redirecionar para si mesmo
    this.funcionarioService.listarTodos().subscribe((funcionarios) => {
      this.funcionariosDisponiveis.set(
        funcionarios.filter((funcionario) => funcionario.id !== this.idFuncionario));
    });
  }

  carregar(id: number): void {
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (dados: Solicitacao) => this.solicitacao.set(dados),
      error: () => this.solicitacao.set(null)
    });
    this.historicoService.listarPorSolicitacao(id).subscribe({
      next: (dados: Historico[]) => this.historico.set(dados == null ? [] : dados)
    });
  }

  efetuarManutencao(): void {
    this.mostrarFormularioManutencao = true;
  }

  // APROVADA/REDIRECIONADA -> ARRUMADA
  confirmarManutencao(): void {
    const s = this.solicitacao();
    if (s == null) return;

    this.solicitacaoService.arrumar(s.id, this.descricaoManutencao.trim(),
        this.orientacoesCliente.trim(), this.idFuncionario).subscribe({
      next: () => {
        this.manutencaoConfirmada = true;
        this.carregar(s.id);
      },
      error: (erro) => {
        if (erro.status === 409) {
          alert('Esta solicitação não pode ser arrumada por você no estado atual.');
        } else {
          alert('Não foi possível registrar a manutenção.');
        }
      }
    });
  }

  redirecionarManutencao(): void {
    this.mostrarFormularioRedirecionamento = true;
  }

  // APROVADA/REDIRECIONADA -> REDIRECIONADA
  confirmarRedirecionamento(): void {
    const s = this.solicitacao();
    if (s == null) return;

    this.solicitacaoService.redirecionar(s.id, this.idFuncionario, this.idFuncionarioDestino).subscribe({
      next: () => {
        this.redirecionamentoConfirmado = true;
        this.carregar(s.id);
      },
      error: (erro) => {
        if (erro.status === 409) {
          alert('Esta solicitação não pode ser redirecionada por você no estado atual.');
        } else {
          alert('Não foi possível redirecionar a solicitação.');
        }
      }
    });
  }

  cancelarManutencao(): void {
    this.mostrarFormularioManutencao = false;
  }

  cancelarRedirecionamento(): void {
    this.mostrarFormularioRedirecionamento = false;
  }
}