package br.ufpr.manutencao.rest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufpr.manutencao.model.Funcionario;
import br.ufpr.manutencao.model.Estado;
import br.ufpr.manutencao.model.Usuario;

import br.ufpr.manutencao.repository.FuncionarioRepository;
import br.ufpr.manutencao.repository.SolicitacaoRepository;
import br.ufpr.manutencao.repository.UsuarioRepository;
import br.ufpr.manutencao.util.SenhaUtil;

@CrossOrigin
@RestController
public class FuncionarioREST {

    // Repositorios injetados Spring
    @Autowired
    private FuncionarioRepository repo;

    // O e-mail e unico entre todos os usuarios
    @Autowired
    private UsuarioRepository usuarioRepo;
    
    // Para conferir se o funcionario tem solicitacoes redirecionadas pendentes 
    @Autowired
    private SolicitacaoRepository solicitacaoRepo;

    // Validacao no back-end
    private boolean dadosInvalidos(Funcionario f) {
        return f == null
            || f.getNome() == null || f.getNome().trim().isEmpty() || f.getNome().trim().length() > 100
            || f.getEmail() == null || !f.getEmail().contains("@") || f.getEmail().trim().length() > 100
            || f.getDataNascimento() == null
            || f.getDataNascimento().isAfter(LocalDate.now());
    }

    private boolean senhaVazia(Funcionario f) {
        return f.getSenha() == null || f.getSenha().trim().isEmpty();
    }

    @GetMapping("/funcionarios")
    public ResponseEntity<List<Funcionario>> obterTodosFuncionarios() {
        return ResponseEntity.ok(repo.findByAtivoTrueOrderByNome());
    }

    @GetMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> obterFuncionarioPorId(@PathVariable("id") int id) {
        Optional<Funcionario> f = repo.findById(id);
        if (f.isEmpty() || !f.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(f.get());
    }

    @PostMapping("/funcionarios")
    public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario) {
        if (dadosInvalidos(funcionario) || senhaVazia(funcionario)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String email = funcionario.getEmail().trim().toLowerCase();
        if (usuarioRepo.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        funcionario.setId(null);        
        funcionario.setNome(funcionario.getNome().trim());
        funcionario.setEmail(email);
        funcionario.setPerfil("FUNCIONARIO");
        funcionario.setAtivo(true);
        SenhaUtil.definirSenha(funcionario, funcionario.getSenha());   // grava hash 
        Funcionario salvo = repo.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> alterarFuncionario(@PathVariable("id") int id,
        @RequestBody Funcionario funcionario) {
        
        if (dadosInvalidos(funcionario)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<Funcionario> op = repo.findById(id);
        if (op.isEmpty() || !op.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        Funcionario f = op.get();
        String novoEmail = funcionario.getEmail().trim().toLowerCase();
        Optional<Usuario> dono = usuarioRepo.findByEmail(novoEmail);
        if (dono.isPresent() && !dono.get().getId().equals(f.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        f.setNome(funcionario.getNome().trim());
        f.setEmail(novoEmail);
        f.setDataNascimento(funcionario.getDataNascimento());
        if (!senhaVazia(funcionario)) {             
            SenhaUtil.definirSenha(f, funcionario.getSenha());
        }
        return ResponseEntity.ok(repo.save(f));
    }

    // idLogado
    @DeleteMapping("/funcionarios/{id}")
    public ResponseEntity<Funcionario> removerFuncionario(@PathVariable("id") int id,
        @RequestParam(value = "idLogado", required = true) Integer idLogado) {
        
        Optional<Funcionario> op = repo.findById(id);
        if (op.isEmpty() || !op.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        if (idLogado == id) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();     // remover a si mesmo
        }
        
        if (repo.findByAtivoTrueOrderByNome().size() <= 1) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();        // ultimo funcionario
        }

        if (!solicitacaoRepo.findByFuncionarioResponsavelIdAndEstadoNome(id, Estado.REDIRECIONADA).isEmpty()) {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).build();  // tem solicitacao redirecionada para ele
        }
        Funcionario f = op.get();
        f.setAtivo(false);              // desativacao
        return ResponseEntity.ok(repo.save(f));
    }
}