package br.ufpr.manutencao.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufpr.manutencao.model.Estado;
import br.ufpr.manutencao.model.Funcionario;
import br.ufpr.manutencao.model.Historico;
import br.ufpr.manutencao.model.Solicitacao;
import br.ufpr.manutencao.repository.HistoricoRepository;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoRepository repo;

    public Historico registrar(Solicitacao solicitacao, Estado estadoAnterior, Estado estadoNovo,
        Funcionario funcionario, Funcionario funcionarioDestino, String observacao) {
            
        Historico h = new Historico();
        h.setSolicitacao(solicitacao);
        h.setDataHora(LocalDateTime.now());
        h.setEstadoAnterior(estadoAnterior);
        h.setEstadoNovo(estadoNovo);
        h.setFuncionario(funcionario);
        h.setFuncionarioDestino(funcionarioDestino);
        h.setObservacao(observacao);

        return repo.save(h);
    }
}