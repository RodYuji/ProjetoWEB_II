import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
    funcionarios: Funcionario[] = [
    { nome: 'Gabriel', cpf: '123.456.789-00', cargo: 'Técnico' },
    { nome: 'Arthur', cpf: '987.654.321-00', cargo: 'Atendente' },
    { nome: 'Carlos', cpf: '111.222.333-44', cargo: 'Técnico' },
    { nome: 'Fernando', cpf: '222.333.444-55', cargo: 'Técnico' },
    { nome: 'Rodrigo', cpf: '333.444.555-66', cargo: 'Técnico' }
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