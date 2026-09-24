import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  funcionarios: Funcionario[] = [
    { nome: 'Gabriel Formanek', cpf: '123.456.789-00', cargo: 'Técnico' },
    { nome: 'Arthur Yuji', cpf: '987.654.321-00', cargo: 'Atendente' }
  ];

  listar(): Funcionario[] {
    return this.funcionarios;
  }

  inserir(funcionario: Funcionario): void {
    this.funcionarios.push(funcionario);
  }

  remover(funcionario: Funcionario): void {
    const index = this.funcionarios.indexOf(funcionario);
    if (index > -1) {
      this.funcionarios.splice(index, 1);
    }
  }
}