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
  novoFuncionario = { nome: '', cpf: '', cargo: '' };

  abrirModal() {
    this.novoFuncionario = { nome: '', cpf: '', cargo: '' };
    this.modalAberto = true;
  }

  formularioValido(): boolean {
    return this.novoFuncionario.nome.trim() !== '' &&
           this.novoFuncionario.cpf.trim() !== '' &&
           this.novoFuncionario.cargo !== '';
  }

  salvarFuncionario() {
    if (this.formularioValido()) {
      this.funcionarios.push({ ...this.novoFuncionario });
      this.modalAberto = false;
    }
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  editarFuncionario(funcionario: any) {
    const novoNome = prompt('Digite o novo nome:', funcionario.nome);

    if (novoNome) {
      funcionario.nome = novoNome;
    }
  }

  excluirFuncionario(funcionario: any) {
    const confirmar = confirm(`Deseja excluir ${funcionario.nome}?`);

    if (confirmar) {
      this.funcionarios = this.funcionarios.filter(
        f => f !== funcionario
      );
    }
  }
}