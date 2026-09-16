import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orcamento',
  imports: [DatePipe, RouterLink, NgIf, FormsModule],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.css',
})
export class Orcamento {

  solicitacao: any;
  mostrarModalRejeicao = false;
  motivoRejeicao = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.solicitacao = this.solicitacaoService.solicitacoes.find(
      solicitacao => solicitacao.id === id
    );
  }

  aprovarServico() {
    this.solicitacao.estado = 'APROVADA';
    alert('Serviço aprovado com sucesso!');
    this.router.navigate(['/home-cliente']);
  }

  abrirModalRejeicao() {
    this.mostrarModalRejeicao = true;
    this.motivoRejeicao = '';
  }

  fecharModalRejeicao() {
    this.mostrarModalRejeicao = false;
    this.motivoRejeicao = '';
  }

  confirmarRejeicao() {
    if (!this.motivoRejeicao.trim()) {
      alert('Por favor, descreva o motivo da rejeição.');
      return;
    }

    this.solicitacao.estado = 'REJEITADA';
    this.solicitacao.motivoRejeicao = this.motivoRejeicao;
    
    alert('Serviço rejeitado com sucesso!');
    this.fecharModalRejeicao();
    this.router.navigate(['/home-cliente']);
  }
}