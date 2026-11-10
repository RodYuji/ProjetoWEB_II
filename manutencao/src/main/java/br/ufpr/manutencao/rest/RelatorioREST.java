package br.ufpr.manutencao.rest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/relatorios")
public class RelatorioREST {

    @GetMapping("/receita-dia")
    public ResponseEntity<List<ReceitaDiaria>> getReceitaPorDia(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        if (inicio != null && fim != null && inicio.isAfter(fim)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Dados mockados
        List<ReceitaDiaria> relatorio = List.of(
                new ReceitaDiaria(LocalDate.of(2026, 10, 1),
                        List.of(new ItemReceita("Serviços de manutenção", 1500.00)), 1500.00),
                new ReceitaDiaria(LocalDate.of(2026, 10, 2),
                        List.of(new ItemReceita("Serviços de manutenção", 2300.50)), 2300.50));

        return ResponseEntity.ok(relatorio.stream()
                .filter(receita -> inicio == null || !receita.data().isBefore(inicio))
                .filter(receita -> fim == null || !receita.data().isAfter(fim))
                .toList());
    }

    @GetMapping("/receita-categoria")
    public ResponseEntity<List<ReceitaCategoria>> getReceitaPorCategoria() {
        // Dados mockados
        return ResponseEntity.ok(List.of(
                new ReceitaCategoria("Manutenção de Notebooks", 4200.00, 1),
                new ReceitaCategoria("Formatação e Limpeza", 1800.00, 1)));
    }

    public record ItemReceita(String descricao, double valor) {
    }

    public record ReceitaDiaria(LocalDate data, List<ItemReceita> itens, double total) {
    }

    public record ReceitaCategoria(String categoria, double total, int quantidade) {
    }
}
