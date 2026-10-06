import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';

@Component({
  selector: 'app-gerenciamento-funcionarios',
  imports: [FormsModule],
  templateUrl: './gerenciamento-funcionarios.component.html',
  styleUrl: './gerenciamento-funcionarios.component.css',
})
export class GerenciamentoFuncionariosComponent {
  funcionarios: Funcionario[] = [];

  cargos = ['Técnico', 'Atendente', 'Gerente'];

  modalAberto = false;
  modoEdicao = false;
  indiceEditando = -1;

  funcionarioForm = {
    nome: '',
    cpf: '',
    cargo: ''
  };

  constructor(private funcionarioService: FuncionarioService) {
    this.funcionarios = this.funcionarioService.funcionarios;
  }

  abrirModal() {
    this.funcionarioForm = {
      nome: '',
      cpf: '',
      cargo: ''
    };

    this.modoEdicao = false;
    this.modalAberto = true;
  }

  editarFuncionario(funcionario: Funcionario) {
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
    return (
      this.funcionarioForm.nome.trim() !== '' &&
      this.funcionarioForm.cpf.trim() !== '' &&
      this.funcionarioForm.cargo !== ''
    );
  }

  salvarFuncionario() {
    if (!this.formularioValido()) {
      return;
    }

    if (this.modoEdicao) {
      this.funcionarios[this.indiceEditando] = {
        ...this.funcionarioForm
      };
    } else {
      this.funcionarios.push({
        ...this.funcionarioForm
      });
    }

    this.modalAberto = false;
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  excluirFuncionario(funcionario: Funcionario) {
    const confirmar = confirm(
      `Deseja excluir ${funcionario.nome}?`
    );

    if (confirmar) {
      this.funcionarios = this.funcionarios.filter(
        f => f !== funcionario
      );

      this.funcionarioService.funcionarios = this.funcionarios;
    }
  }
}