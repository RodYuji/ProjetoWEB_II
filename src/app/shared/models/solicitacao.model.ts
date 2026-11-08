import { Cliente } from './cliente.model';
import { Categoria } from './categoria.model';
import { Funcionario } from './funcionario.model';
import { Estado } from './historico.model';

export class Solicitacao {
  constructor(
    public id: number = 0,
    public cliente: Cliente = new Cliente(),
    public categoria: Categoria = new Categoria(),
    public estado: Estado = new Estado(),
    public descricaoEquipamento: string = "",
    public descricaoDefeito: string = "",
    public dataHora: string = "",

    //EFETUAR ORÇAMENTO
    public valorOrcamento: number | null = null,
    public funcionarioOrcamento: Funcionario | null = null,
    public dataHoraOrcamento: string | null = null,

    //EFETUAR MANUTENCAO
    public descricaoManutencao: string | null = null,
    public orientacoesCliente: string | null = null,
    public funcionarioManutencao: Funcionario | null = null,
    public dataHoraManutencao: string | null = null,

    // REDIRECIONAR
    public funcionarioResponsavel: Funcionario | null = null,

    // PAGAR
    public dataHoraPagamento: string | null = null,

    // FINALIZAR
    public funcionarioFinalizacao: Funcionario | null = null,
    public dataHoraFinalizacao: string | null = null
  ) { }
}