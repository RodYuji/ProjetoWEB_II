export type EstadoSolicitacao = 'ABERTA' | 'ORÇADA' | 'REJEITADA' | 'APROVADA' | 'REDIRECIONADA' | 'ARRUMADA' | 'PAGA' | 'FINALIZADA';

export interface SolicitacaoManutencao {
  id: number;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: EstadoSolicitacao;
  nomeCliente: string;

  // RF012 Efetuar Orçamento
  valorOrcamento?: number;
  funcionarioOrcamento?: string;
  dataHoraOrcamento?: Date;

  // RF014 Efetuar Manutenção
  descricaoManutencao?: string;
  orientacoesCliente?: string;
  funcionarioManutencao?: string;
  dataHoraManutencao?: Date;

  // RF015 Redirecionar Manutenção
  funcionarioOrigemRedirecionamento?: string;
  funcionarioDestinoRedirecionamento?: string;
  dataHoraRedirecionamento?: Date;
}