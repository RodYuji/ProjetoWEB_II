export class Cliente {
  constructor(
    public id: number = 0,
    public nome: string = "",
    public cpf: string = "",
    public email: string = "",
    public telefone: string = "",
    public cep: string = "",
    public logradouro: string = "",
    public numero: string = "",
    public complemento: string = "",
    public bairro: string = "",
    public cidade: string = "",
    public uf: string = ""
  ) { }
}
