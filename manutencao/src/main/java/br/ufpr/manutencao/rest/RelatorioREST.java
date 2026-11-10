package br.ufpr.manutencao.rest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.manutencao.service.RelatorioService;
import br.ufpr.manutencao.service.RelatorioService.ReceitaCategoria;
import br.ufpr.manutencao.service.RelatorioService.ReceitaDiaria;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/relatorios")
public class RelatorioREST {

    // Calcula os relatórios a partir das solicitações pagas do banco
    @Autowired
    private RelatorioService relatorioService;

    // RF019 - receita agrupada por dia; inicio e fim (aaaa-mm-dd) podem ficar vazios
    @GetMapping("/receita-dia")
    public ResponseEntity<List<ReceitaDiaria>> getReceitaPorDia(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        if (inicio != null && fim != null && inicio.isAfter(fim)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(relatorioService.buscarReceitaPorDia(inicio, fim));
    }

    // RF020 - receita agrupada por categoria, desde sempre
    @GetMapping("/receita-categoria")
    public ResponseEntity<List<ReceitaCategoria>> getReceitaPorCategoria() {
        return ResponseEntity.ok(relatorioService.buscarReceitaPorCategoria());
    }
}