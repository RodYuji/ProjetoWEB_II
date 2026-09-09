export type EstadoSolicitacao = 'ABERTA';

export interface SolicitacaoManutencao {
  id: number;
  equipamento: string;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: EstadoSolicitacao;
}