export type EstadoSolicitacao = 'ABERTA' | 'ORÇADA' | 'REJEITADA' | 'APROVADA' | 'REDIRECIONADA' | 'ARRUMADA' | 'PAGA' | 'FINALIZADA';

export interface SolicitacaoManutencao {
  id: number;
  equipamento: string;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: EstadoSolicitacao;
  nomeCliente: string;

  // RF014 Efetuar Manutenção
  descricaoManutencao?: string;
  orientacoesCliente?: string;
  funcionarioManutencao?: string;
  dataHoraManutencao?: Date;
}