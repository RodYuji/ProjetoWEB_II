package br.ufpr.manutencao.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/relatorios")
public class RelatorioREST {

    // Endpoint para receita agrupada por dia
    @GetMapping("/receita-dia")
    public ResponseEntity<List<Map<String, Object>>> getReceitaPorDia() {
        List<Map<String, Object>> relatorio = new ArrayList<>();
        
        // Exemplo de dados simulados que o front-end vai receber para montar o jspdf
        Map<String, Object> item1 = new HashMap<>();
        item1.put("data", "2026-10-01");
        item1.put("total", 1500.00);
        relatorio.add(item1);

        Map<String, Object> item2 = new HashMap<>();
        item2.put("data", "2026-10-02");
        item2.put("total", 2300.50);
        relatorio.add(item2);

        return ResponseEntity.ok(relatorio);
    }

    @GetMapping("/receita-categoria")
    public ResponseEntity<List<Map<String, Object>>> getReceitaPorCategoria() {
        List<Map<String, Object>> relatorio = new ArrayList<>();

        Map<String, Object> item1 = new HashMap<>();
        item1.put("categoria", "Manutenção de Notebooks");
        item1.put("total", 4200.00);
        relatorio.add(item1);

        Map<String, Object> item2 = new HashMap<>();
        item2.put("categoria", "Formatação e Limpeza");
        item2.put("total", 1800.00);
        relatorio.add(item2);

        return ResponseEntity.ok(relatorio);
    }
}