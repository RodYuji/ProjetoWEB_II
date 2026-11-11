package br.ufpr.manutencao.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.manutencao.model.Login;
import br.ufpr.manutencao.model.Usuario;
import br.ufpr.manutencao.repository.UsuarioRepository;
import br.ufpr.manutencao.util.SenhaUtil;

@CrossOrigin(origins = "*")
@RestController
public class LoginREST {

    // Busca em tb_usuario
    @Autowired
    private UsuarioRepository repo;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        if (login == null || login.getEmail() == null || login.getSenha() == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Optional<Usuario> op = repo.findByEmail(login.getEmail().trim().toLowerCase());

        if (op.isPresent() && op.get().isAtivo() && SenhaUtil.conferir(op.get(), login.getSenha()))
            return ResponseEntity.ok(op.get());
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}