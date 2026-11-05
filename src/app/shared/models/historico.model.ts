import { Funcionario } from './funcionario.model';

export class Estado {
  constructor(
    public id: number = 0,
    public nome: string = ""
  ) { }
}

export class Historico {
  constructor(
    public id: number = 0,
    public dataHora: string = "",
    public estadoAnterior: Estado | null = null,
    public estadoNovo: Estado = new Estado(),
    public funcionario: Funcionario | null = null,
    public funcionarioDestino: Funcionario | null = null,
    public observacao: string | null = null
  ) { }
}