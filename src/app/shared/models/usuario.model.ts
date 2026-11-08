export class Usuario {
  constructor(
    public id: number = 0,
    public nome: string = "",
    public email: string = "",
    public perfil: string = ""   // "CLIENTE" ou "FUNCIONARIO"
  ) { }
}