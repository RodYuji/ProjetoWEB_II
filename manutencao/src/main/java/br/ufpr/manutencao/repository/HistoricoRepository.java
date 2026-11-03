package br.ufpr.manutencao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Historico;

public interface HistoricoRepository extends JpaRepository<Historico, Integer> {
    // RF008: historico completo da solicitacao, do mais antigo para o mais recente
    List<Historico> findBySolicitacaoIdOrderByDataHoraAsc(Integer solicitacaoId);
}
