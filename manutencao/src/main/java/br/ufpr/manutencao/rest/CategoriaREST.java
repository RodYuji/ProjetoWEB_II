package br.ufpr.manutencao.rest;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufpr.manutencao.model.Categoria;

@CrossOrigin
@RestController
public class CategoriaREST {

    public static List<Categoria> lista = new ArrayList<>();

    static {
        // massa de teste exigida pelo enunciado
        lista.add(new Categoria(1, "Notebook", true));
        lista.add(new Categoria(2, "Desktop", true));
        lista.add(new Categoria(3, "Impressora", true));
        lista.add(new Categoria(4, "Mouse", true));
        lista.add(new Categoria(5, "Teclado", true));
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> obterTodasCategorias() {
        List<Categoria> ativas = lista.stream()
                .filter(c -> c.isAtivo()).toList();
        return ResponseEntity.ok(ativas);
    }

    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> obterCategoriaPorId(@PathVariable("id") int id) {
        Categoria c = lista.stream().filter(cat -> cat.getId() == id && cat.isAtivo())
                .findAny().orElse(null);
        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(c);
    }

    @PostMapping("/categorias")
    public ResponseEntity<Categoria> inserirCategoria(@RequestBody Categoria categoria) {
        Categoria c = lista.stream().filter(cat -> cat.isAtivo()
                && cat.getNome().equalsIgnoreCase(categoria.getNome()))
                .findAny().orElse(null);
        if (c != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        c = lista.stream().max(Comparator.comparing(Categoria::getId)).orElse(null);
        if (c == null)
            categoria.setId(1);
        else
            categoria.setId(c.getId() + 1);
        categoria.setAtivo(true);
        lista.add(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> alterarCategoria(@PathVariable("id") int id,
                                                      @RequestBody Categoria categoria) {
        Categoria c = lista.stream().filter(cat -> cat.getId() == id && cat.isAtivo())
                .findAny().orElse(null);
        if (c != null) {
            c.setNome(categoria.getNome());
            return ResponseEntity.ok(c);
        }
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Categoria> removerCategoria(@PathVariable("id") int id) {
        Categoria c = lista.stream().filter(cat -> cat.getId() == id && cat.isAtivo())
                .findAny().orElse(null);
        if (c != null) {
            c.setAtivo(false);   // desativação, exigida pelo enunciado
            return ResponseEntity.ok(c);
        }
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}