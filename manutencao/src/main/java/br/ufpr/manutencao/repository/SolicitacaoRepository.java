package br.ufpr.manutencao.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    //Query para buscar solicitacoes pagas por periodo e com Data e Hora
    @Query("""
            select s from Solicitacao s
            where s.dataHoraPagamento is not null
              and (:inicioInclusivo is null or s.dataHoraPagamento >= :inicioInclusivo)
              and (:fimExclusivo is null or s.dataHoraPagamento < :fimExclusivo)
            order by s.dataHoraPagamento asc
            """)
    List<Solicitacao> buscarPagasNoPeriodo(
            @Param("inicioInclusivo") LocalDateTime inicioInclusivo,
            @Param("fimExclusivo") LocalDateTime fimExclusivo);

    @Query("""
            select s from Solicitacao s
            where s.dataHoraPagamento is not null
            order by s.dataHoraPagamento asc
            """)
    List<Solicitacao> buscarTodasPagas();
}
