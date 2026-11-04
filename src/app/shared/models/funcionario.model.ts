export class Funcionario {
  constructor(
    public id: number = 0,
    public nome: string = "",
    public email: string = "",
    public dataNascimento: string = "",
    public senha: string = "",
    public ativo: boolean = true
  ) { }
}