package br.ufpr.manutencao.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.manutencao.model.Login;
import br.ufpr.manutencao.model.Usuario;
import br.ufpr.manutencao.util.SenhaUtil;

@CrossOrigin(origins = "*")
@RestController
public class LoginREST {

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Login login) {
        if (login == null || login.getEmail() == null || login.getSenha() == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Usuario> todos = new ArrayList<>();
        todos.addAll(ClienteREST.listaClientes);
        todos.addAll(FuncionarioREST.listaFuncionarios);

        Usuario usuario = todos.stream()
                .filter(u -> u.getEmail() != null && u.getEmail().equalsIgnoreCase(login.getEmail().trim()))
                .findAny().orElse(null);

        if (usuario != null && SenhaUtil.conferir(usuario, login.getSenha()))
            return ResponseEntity.ok(usuario);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
