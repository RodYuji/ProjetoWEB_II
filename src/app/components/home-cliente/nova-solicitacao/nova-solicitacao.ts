import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoManutencao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';


@Component({
  selector: 'app-nova-solicitacao',
  imports: [ FormsModule],
  templateUrl: './nova-solicitacao.html',
})

export class NovaSolicitacao {
  private solicitacaoService = inject(SolicitacaoService);
  descricaoEquipamento = '';
  categoriaEquipamento = '';
  descricaoDefeito = '';
  solicitacaoRegistrada: SolicitacaoManutencao | null = null;
  mensagemErro = '';

  readonly categorias = [
    'Notebook',
    'Desktop',
    'Impressora',
    'Monitor',
    'Periférico',
    'Outro',
  ];

  registrarSolicitacao(): void {
    if (!this.formularioValido()) {
      this.mensagemErro = 'Preencha todos os campos da solicitação.';
      this.solicitacaoRegistrada = null;
      return;
    }

    this.solicitacaoRegistrada = this.solicitacaoService.adicionarSolicitacao ({
      nomeCliente: 'Cliente Teste',
      descricaoEquipamento: this.descricaoEquipamento.trim(),
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito.trim(),
      dataHora: new Date(),
      estado: 'ABERTA',
    });
    this.mensagemErro = '';
  }

  limparFormulario(): void {
    this.descricaoEquipamento = '';
    this.categoriaEquipamento = '';
    this.descricaoDefeito = '';
    this.solicitacaoRegistrada = null;
    this.mensagemErro = '';
  }

  private formularioValido(): boolean {
    return Boolean(
      this.descricaoEquipamento.trim() &&
      this.categoriaEquipamento &&
      this.descricaoDefeito.trim(),
    );
  }
}