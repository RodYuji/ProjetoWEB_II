import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type EstadoSolicitacao = 'ABERTA';

export interface SolicitacaoManutencao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: EstadoSolicitacao;
}

@Component({
  selector: 'app-nova-solicitacao',
  imports: [DatePipe, FormsModule],
  templateUrl: './nova-solicitacao.html',
})
export class NovaSolicitacao {
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

    this.solicitacaoRegistrada = {
      descricaoEquipamento: this.descricaoEquipamento.trim(),
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito.trim(),
      dataHora: new Date(),
      estado: 'ABERTA',
    };
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
