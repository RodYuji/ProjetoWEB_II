import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagar-servico',
  imports: [CommonModule],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css',
})
export class PagarServico {
  solicitacao: any;
  pagamentoConfirmado = false;

  constructor(
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    const idNumero = Number(id);
    this.solicitacao = this.solicitacaoService.solicitacoes.find(
      solicitacao => solicitacao.id === idNumero
    );
  }

  confirmarPagamento() {
    if (this.solicitacao) {
      const agora = new Date();
      const data = agora.toLocaleDateString('pt-BR');
      const hora = agora.toLocaleTimeString('pt-BR');

      // Registrar data e hora do pagamento
      this.solicitacao.dataPagamento = data;
      this.solicitacao.horaPagamento = hora;
      this.solicitacao.status = 'PAGA';

      this.pagamentoConfirmado = true;
    }
  }

  redirecionarHome() {
    this.router.navigate(['/home-cliente']);
  }
}
