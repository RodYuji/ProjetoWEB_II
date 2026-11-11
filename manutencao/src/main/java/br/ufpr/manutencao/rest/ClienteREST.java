package br.ufpr.manutencao.rest;

import br.ufpr.manutencao.model.Cliente;
import br.ufpr.manutencao.repository.ClienteRepository;
import br.ufpr.manutencao.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// imports acima são do gab, abaixo são do fernando

import br.ufpr.manutencao.util.SenhaUtil;
import java.util.List;
import java.util.Random; 
import org.springframework.mail.MailException;
import br.ufpr.manutencao.service.EmailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")
public class ClienteREST {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Cliente> listar() {
        // Busca todos os clientes salvos no PostgreSQL
        return clienteRepository.findAll();
    }

    @PostMapping("/autocadastro")
    public ResponseEntity<Cliente> autocadastro(@RequestBody Cliente cliente) {
        
        if (cliente == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        // só dígitos em CPF CEP telefone email minúsculo
        cliente.setCpf(somenteDigitos(cliente.getCpf()));
        cliente.setCep(somenteDigitos(cliente.getCep()));
        cliente.setTelefone(somenteDigitos(cliente.getTelefone()));

        if (cliente.getEmail() != null)
            cliente.setEmail(cliente.getEmail().trim().toLowerCase());

        if (dadosInvalidos(cliente))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        // se já existe 409 
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()
                || usuarioRepository.findByEmail(cliente.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        //guarda só o hash SHA-256 e SALT
        String senhaAleatoria = String.format("%04d", new Random().nextInt(10000));
        SenhaUtil.definirSenha(cliente, senhaAleatoria);

        cliente.setId(null);          // o banco gera o id
        cliente.setPerfil("CLIENTE");
        cliente.setAtivo(true);

        Cliente salvo = clienteRepository.save(cliente);

        // envia a senha por email
        try {
            emailService.enviarSenhaAutocadastro(salvo.getEmail(), salvo.getNome(), senhaAleatoria);
        } catch (MailException e) {
            System.out.println("Falha ao enviar e-mail para " + salvo.getEmail()
                    + " (" + e.getMessage() + "). Senha gerada: " + senhaAleatoria);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    private static String somenteDigitos(String valor) {
        return valor == null ? null : valor.replaceAll("\\D", "");
    }


    private static boolean vazio(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    // validacao backend
    private boolean dadosInvalidos(Cliente c) {
        return vazio(c.getNome()) || c.getNome().trim().length() > 100
            || vazio(c.getEmail()) || !c.getEmail().contains("@") || c.getEmail().length() > 100
            || c.getCpf() == null || c.getCpf().length() != 11
            || vazio(c.getTelefone()) || c.getTelefone().length() > 15
            || c.getCep() == null || c.getCep().length() != 8
            || vazio(c.getLogradouro()) || vazio(c.getNumero()) || vazio(c.getBairro())
            || vazio(c.getCidade()) || c.getUf() == null || c.getUf().trim().length() != 2;
    }
}
