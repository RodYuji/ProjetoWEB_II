package br.ufpr.manutencao.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Solicitacao;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Integer> {
    List<Solicitacao> findByClienteIdOrderByDataHoraAsc(Integer clienteId);

    List<Solicitacao> findByEstadoNomeOrderByDataHoraAsc(String nomeEstado);

    List<Solicitacao> findAllByOrderByDataHoraAsc();
    List<Solicitacao> findByDataHoraBetweenOrderByDataHoraAsc(LocalDateTime inicio, LocalDateTime fim);
    
    List<Solicitacao> findByFuncionarioResponsavelIdAndEstadoNome(Integer funcionarioId, String nomeEstado);
}
