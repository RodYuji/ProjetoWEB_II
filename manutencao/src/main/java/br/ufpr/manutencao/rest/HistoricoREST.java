package br.ufpr.manutencao.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufpr.manutencao.model.Historico;
import br.ufpr.manutencao.model.Solicitacao;
import br.ufpr.manutencao.repository.HistoricoRepository;
import br.ufpr.manutencao.repository.SolicitacaoRepository;

@CrossOrigin
@RestController
public class HistoricoREST {

    @Autowired
    private HistoricoRepository Historicorepo;

    @Autowired
    private SolicitacaoRepository solicitacaoRepo;

    @GetMapping("/solicitacoes/{id}/historico")
    public ResponseEntity<List<Historico>> obterHistorico(@PathVariable("id") int id) {
        Optional<Solicitacao> s = solicitacaoRepo.findById(id);
        if (s.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else {
            List<Historico> lista = Historicorepo.findBySolicitacaoIdOrderByDataHoraAsc(id);
            return ResponseEntity.ok(lista);            
        }
            
    }

}