package br.ufpr.manutencao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    List<Categoria> findByAtivoTrueOrderByNome();
    boolean existsByNomeIgnoreCaseAndAtivoTrue(String nome);
}
