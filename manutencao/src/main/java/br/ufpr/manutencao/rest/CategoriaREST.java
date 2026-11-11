package br.ufpr.manutencao.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufpr.manutencao.model.Categoria;
import br.ufpr.manutencao.repository.CategoriaRepository;

@CrossOrigin
@RestController
public class CategoriaREST {

    // Repositorio injetado pelo Spring (slides 1048 e 1258)
    @Autowired
    private CategoriaRepository repo;

    // Validacao no back-end (enunciado): nome obrigatorio, ate 50 caracteres (varchar(50))
    private boolean nomeInvalido(Categoria categoria) {
        return categoria == null || categoria.getNome() == null
                || categoria.getNome().trim().isEmpty()
                || categoria.getNome().trim().length() > 50;
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> obterTodasCategorias() {
        return ResponseEntity.ok(repo.findByAtivoTrueOrderByNome());
    }

    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> obterCategoriaPorId(@PathVariable("id") int id) {
        Optional<Categoria> c = repo.findById(id);
        if (c.isEmpty() || !c.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(c.get());
    }

    @PostMapping("/categorias")
    public ResponseEntity<Categoria> inserirCategoria(@RequestBody Categoria categoria) {
        if (nomeInvalido(categoria)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (repo.existsByNomeIgnoreCaseAndAtivoTrue(categoria.getNome().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        categoria.setId(null);          // o banco gera o id 
        categoria.setNome(categoria.getNome().trim());
        categoria.setAtivo(true);
        Categoria salva = repo.save(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> alterarCategoria(@PathVariable("id") int id,
                                                      @RequestBody Categoria categoria) {
        if (nomeInvalido(categoria)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<Categoria> op = repo.findById(id);
        if (op.isEmpty() || !op.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        Categoria c = op.get();
        String novoNome = categoria.getNome().trim();
        if (!c.getNome().equalsIgnoreCase(novoNome) && repo.existsByNomeIgnoreCaseAndAtivoTrue(novoNome)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        c.setNome(novoNome);
        return ResponseEntity.ok(repo.save(c));
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Categoria> removerCategoria(@PathVariable("id") int id) {
        Optional<Categoria> op = repo.findById(id);
        if (op.isEmpty() || !op.get().isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        Categoria c = op.get();
        c.setAtivo(false);              // desativacao
        return ResponseEntity.ok(repo.save(c));
    }
}