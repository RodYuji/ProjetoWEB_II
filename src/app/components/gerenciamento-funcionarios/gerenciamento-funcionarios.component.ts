import { Component } from '@angular/core';

@Component({
  selector: 'app-gerenciamento-funcionarios',
  imports: [],
  templateUrl: './gerenciamento-funcionarios.component.html',
  styleUrl: './gerenciamento-funcionarios.component.css',
})
export class GerenciamentoFuncionariosComponent {

  funcionarios = [
    {
      nome: 'Gabriel Formanek',
      cpf: '123.456.789-00',
      cargo: 'Técnico'
    },
    {
      nome: 'Arthur Yuji',
      cpf: '987.654.321-00',
      cargo: 'Atendente'
    }
  ];

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