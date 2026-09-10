import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../shared/services/solicitacao-cliente.service';
import { SolicitacaoManutencao } from '../../models/solicitacao.model';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [FormsModule],
  templateUrl: './nova-solicitacao.html',
})
export class NovaSolicitacao {
  private solicitacaoService = inject(SolicitacaoService);

  equipamento = '';
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

    const solicitacaoCriada = this.solicitacaoService.adicionarSolicitacao({
      equipamento: this.equipamento.trim(),
      descricaoEquipamento: this.descricaoEquipamento.trim(),
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito.trim(),
      dataHora: new Date(),
      estado: 'ABERTA',
      nomeCliente: 'Cliente Teste',
    });

    this.solicitacaoRegistrada = solicitacaoCriada;
    this.mensagemErro = '';
    console.log('Solicitação registrada:', solicitacaoCriada);
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