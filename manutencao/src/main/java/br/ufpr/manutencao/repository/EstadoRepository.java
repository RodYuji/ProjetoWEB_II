package br.ufpr.manutencao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Estado;

/** Use as constantes de Estado: estadoRepository.findByNome(Estado.ABERTA) */
public interface EstadoRepository extends JpaRepository<Estado, Integer> {
    Optional<Estado> findByNome(String nome);
}
