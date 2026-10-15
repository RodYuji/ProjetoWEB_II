import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciamento-funcionarios',
  imports: [FormsModule],
  templateUrl: './gerenciamento-funcionarios.component.html',
  styleUrl: './gerenciamento-funcionarios.component.css',
})
export class GerenciamentoFuncionariosComponent {
  funcionarios = [
    { nome: 'Gabriel Formanek', cpf: '123.456.789-00', cargo: 'Técnico' },
    { nome: 'Arthur Yuji', cpf: '987.654.321-00', cargo: 'Atendente' }
  ];

  cargos = ['Técnico', 'Atendente', 'Gerente'];

  modalAberto = false;
  modoEdicao = false;
  indiceEditando = -1;
  funcionarioForm = { nome: '', cpf: '', cargo: '' };

  modalExclusaoAberto = false;
  funcionarioParaExcluir: any = null;

  abrirModal() {
    this.funcionarioForm = { nome: '', cpf: '', cargo: '' };
    this.modoEdicao = false;
    this.modalAberto = true;
  }

  editarFuncionario(funcionario: any) {
    this.indiceEditando = this.funcionarios.indexOf(funcionario);
    this.funcionarioForm = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      cargo: funcionario.cargo
    };
    this.modoEdicao = true;
    this.modalAberto = true;
  }

  formularioValido(): boolean {
    return this.funcionarioForm.nome.trim() !== '' &&
           this.funcionarioForm.cpf.trim() !== '' &&
           this.funcionarioForm.cargo !== '';
  }

  salvarFuncionario() {
    if (!this.formularioValido()) {
      return;
    }

    if (this.modoEdicao) {
      this.funcionarios[this.indiceEditando] = { ...this.funcionarioForm };
    } else {
      this.funcionarios.push({ ...this.funcionarioForm });
    }

    this.modalAberto = false;
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  abrirModalExclusao(funcionario: any) {
    this.funcionarioParaExcluir = funcionario;
    this.modalExclusaoAberto = true;
  }

  confirmarExclusao() {
    if (this.funcionarioParaExcluir) {
      this.funcionarios = this.funcionarios.filter(
        f => f !== this.funcionarioParaExcluir
      );
    }
    this.modalExclusaoAberto = false;
  }

  cancelarExclusao() {
    this.modalExclusaoAberto = false;
  }
}