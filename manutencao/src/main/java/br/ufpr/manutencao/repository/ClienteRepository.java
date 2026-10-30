package br.ufpr.manutencao.repository;

import br.ufpr.manutencao.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    
    // Métodos úteis para buscar por CPF ou E-mail (essencial para a regra de unicidade do RF001)
    Optional<Cliente> findByCpf(String cpf);
    Optional<Cliente> findByEmail(String email);
}