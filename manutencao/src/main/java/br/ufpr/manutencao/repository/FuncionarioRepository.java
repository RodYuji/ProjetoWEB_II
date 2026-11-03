package br.ufpr.manutencao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
    Optional<Funcionario> findByEmail(String email);
    List<Funcionario> findByAtivoTrueOrderByNome();
}
