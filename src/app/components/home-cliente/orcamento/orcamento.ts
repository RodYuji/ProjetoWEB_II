import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MoedaPipe } from '../../../shared/pipes/moeda-pipe';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
  selector: 'app-orcamento',
  imports: [DatePipe, RouterLink, FormsModule, MoedaPipe],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.css',
})
export class Orcamento implements OnInit {

  // solicitação carregada da API
  solicitacao = signal<Solicitacao | null>(null);
  mostrarModalRejeicao = false;
  motivoRejeicao = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private solicitacaoService = inject(SolicitacaoService);
  private moedaPipe = new MoedaPipe();

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (dados: Solicitacao) => this.solicitacao.set(dados),
      error: () => this.solicitacao.set(null)
    });
  }

  // aprovar serviço
  aprovarServico() {
    const s = this.solicitacao();
    if (s == null) return;
    this.solicitacaoService.aprovar(s.id).subscribe({
      next: () => {
        alert('Serviço Aprovado no Valor ' + this.moedaPipe.transform(s.valorOrcamento));
        this.router.navigate(['/home-cliente']);
      },
      error: () => alert('Não foi possível aprovar o serviço.')
    });
  }

  abrirModalRejeicao() {
    this.mostrarModalRejeicao = true;
    this.motivoRejeicao = '';
  }

  fecharModalRejeicao() {
    this.mostrarModalRejeicao = false;
    this.motivoRejeicao = '';
  }

  // rejeitar serviço 
  confirmarRejeicao() {
    const s = this.solicitacao();
    if (s == null) return;
    if (!this.motivoRejeicao.trim()) {
      alert('Por favor, descreva o motivo da rejeição.');
      return;
    }
    this.solicitacaoService.rejeitar(s.id, this.motivoRejeicao.trim()).subscribe({
      next: () => {
        alert('Serviço Rejeitado');
        this.fecharModalRejeicao();
        this.router.navigate(['/home-cliente']);
      },
      error: () => alert('Não foi possível rejeitar o serviço.')
    });
  }

}