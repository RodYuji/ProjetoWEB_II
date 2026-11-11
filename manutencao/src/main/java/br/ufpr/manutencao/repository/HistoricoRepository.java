package br.ufpr.manutencao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Historico;

public interface HistoricoRepository extends JpaRepository<Historico, Integer> {
    List<Historico> findBySolicitacaoIdOrderByDataHoraAsc(Integer solicitacaoId);
}
