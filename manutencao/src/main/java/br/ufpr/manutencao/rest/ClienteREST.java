package br.ufpr.manutencao.rest;

import br.ufpr.manutencao.model.Cliente;
import br.ufpr.manutencao.util.SenhaUtil;
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

    // Lista temporária para simular a base de dados (seguindo o razer)
    public static List<Cliente> listaClientes = new ArrayList<>();

    static {
        Cliente c1 = new Cliente(1, "111.222.333-44", "João da Silva", "joao@email.com", null, "(41) 98888-1111", "Rua das Flores, 100 - Curitiba/PR");
        SenhaUtil.definirSenha(c1, "1234");
        listaClientes.add(c1);

        Cliente c2 = new Cliente(2, "222.333.444-55", "Maria Oliveira", "maria@email.com", null, "(41) 97777-2222", "Av. Comendador Franco, 500 - Curitiba/PR");
        SenhaUtil.definirSenha(c2, "5678");
        listaClientes.add(c2);
    }

    @GetMapping
    public List<Cliente> listar() {
        return listaClientes;
    }

    @PostMapping("/autocadastro")
    public Cliente autocadastro(@RequestBody Cliente cliente) {
        // Gera a senha aleatória de 4 digitos
        String senhaAleatoria = String.format("%04d", new Random().nextInt(10000));

        // Guarda só o hash SHA-256 + SALT, nunca a senha pura
        SenhaUtil.definirSenha(cliente, senhaAleatoria);
        cliente.setPerfil("CLIENTE"); // ignora qualquer perfil vindo no JSON

        // precisa enviar a senha por email, por enquanto só mostra no console
        System.out.println("Senha gerada para " + cliente.getEmail() + ": " + senhaAleatoria);

        cliente.setId(listaClientes.size() + 1);
        listaClientes.add(cliente);
        return cliente;
    }
}
