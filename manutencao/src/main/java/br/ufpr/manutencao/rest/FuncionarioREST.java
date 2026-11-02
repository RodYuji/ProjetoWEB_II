package br.ufpr.manutencao.rest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.manutencao.model.Funcionario;
import br.ufpr.manutencao.util.SenhaUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioREST {

    public static List<Funcionario> listaFuncionarios = new ArrayList<>();

    static {
        Funcionario f1 = new Funcionario(1, "Mário", "mario@email.com", null, data(1985, 3, 10));
        SenhaUtil.definirSenha(f1, "1234");
        listaFuncionarios.add(f1);

        Funcionario f2 = new Funcionario(2, "Maria Funcionária", "maria.func@email.com", null, data(1990, 7, 22));
        SenhaUtil.definirSenha(f2, "1234");
        listaFuncionarios.add(f2);
    }

    private static Date data(int ano, int mes, int dia) {
        return Date.from(LocalDate.of(ano, mes, dia).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    @GetMapping
    public ResponseEntity<List<Funcionario>> listar() {
        return ResponseEntity.ok(listaFuncionarios);
    }
}
