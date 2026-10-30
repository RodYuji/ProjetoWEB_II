package br.ufpr.manutencao.rest;

import br.ufpr.manutencao.model.Cliente;
import br.ufpr.manutencao.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/clientes")
public class ClienteREST {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listar() {
        // Busca todos os clientes salvos no PostgreSQL
        return clienteRepository.findAll();
    }

    @PostMapping("/autocadastro")
    public ResponseEntity<Object> autocadastro(@RequestBody Cliente cliente) {
        // Validação de unicidade do CPF (RF001)
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Erro: Já existe um cliente cadastrado com este CPF.");
        }

        // Validação de unicidade do E-mail (RF001)
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Erro: Já existe um cliente cadastrado com este e-mail.");
        }

        // Gera a senha aleatória de 4 dígitos exigida no RF001
        String senhaAleatoria = String.format("%04d", new Random().nextInt(10000));
        cliente.setSenha(senhaAleatoria);
        
        // Salva de verdade no PostgreSQL (o ID é gerado automaticamente pelo banco)
        Cliente clienteSalvo = clienteRepository.save(cliente);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteSalvo);
    }
}