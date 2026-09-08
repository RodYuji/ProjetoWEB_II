export type EstadoSolicitacao = 'ABERTA';

export interface SolicitacaoManutencao {
  id: number;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: EstadoSolicitacao;
}