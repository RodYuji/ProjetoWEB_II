package br.ufpr.manutencao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.manutencao.model.Usuario;

/** Busca cliente ou funcionario pelo e-mail (login unico, RF002). */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
}
