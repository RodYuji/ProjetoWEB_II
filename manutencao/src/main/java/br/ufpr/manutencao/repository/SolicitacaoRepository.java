package br.ufpr.manutencao.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Integer> {
    // RF003: solicitacoes do cliente, em ordem crescente de data/hora
    List<Solicitacao> findByClienteIdOrderByDataHoraAsc(Integer clienteId);

    // RF011: solicitacoes em um estado (ex.: ABERTA)
    List<Solicitacao> findByEstadoNomeOrderByDataHoraAsc(String nomeEstado);

    // RF013: todas / por periodo de abertura
    List<Solicitacao> findAllByOrderByDataHoraAsc();
    List<Solicitacao> findByDataHoraBetweenOrderByDataHoraAsc(LocalDateTime inicio, LocalDateTime fim);
    
    // RF015/RF018: solicitacoes que estao com um funcionario em um estado
    List<Solicitacao> findByFuncionarioResponsavelIdAndEstadoNome(Integer funcionarioId, String nomeEstado);
}
