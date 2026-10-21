package br.ufpr.manutencao.rest;

import br.ufpr.manutencao.model.Cliente;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/clientes")
public class ClienteREST {

    // Lista temporária para simular a base de dados (seguindo o razer
    private static List<Cliente> listaClientes = new ArrayList<>();

    static {
        listaClientes.add(new Cliente(1, "111.222.333-44", "João da Silva", "joao@email.com", "1234", "(41) 98888-1111", "Rua das Flores, 100 - Curitiba/PR"));
        listaClientes.add(new Cliente(2, "222.333.444-55", "Maria Oliveira", "maria@email.com", "5678", "(41) 97777-2222", "Av. Comendador Franco, 500 - Curitiba/PR"));
    }
    @GetMapping
    public List<Cliente> listar() {
        return listaClientes;
    }

    @PostMapping("/autocadastro")
    public Cliente autocadastro(@RequestBody Cliente cliente) {
        // Gera a senha aleatória de 4 dígitos exigida no RF001
        String senhaAleatoria = String.format("%04d", new Random().nextInt(10000));
        cliente.setSenha(senhaAleatoria);
        
        cliente.setId(listaClientes.size() + 1);   
        listaClientes.add(cliente);
        return cliente;
    }
}