package br.ufpr.manutencao.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import br.ufpr.manutencao.model.Solicitacao;
import br.ufpr.manutencao.repository.SolicitacaoRepository;

@Service
public class RelatorioService {

    private final SolicitacaoRepository solicitacaoRepository;

    public RelatorioService(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    public List<ReceitaDiaria> buscarReceitaPorDia(LocalDate inicio, LocalDate fim) {
        LocalDateTime inicioInclusivo = inicio == null ? null : inicio.atStartOfDay();
        LocalDateTime fimExclusivo = fim == null ? null : fim.plusDays(1).atStartOfDay();
        List<Solicitacao> solicitacoes = solicitacaoRepository.buscarPagasNoPeriodo(inicioInclusivo, fimExclusivo);
        Map<LocalDate, List<ItemReceita>> porDia = new LinkedHashMap<>();

        for (Solicitacao solicitacao : solicitacoes) {
            LocalDate dataPagamento = solicitacao.getDataHoraPagamento().toLocalDate();
            String descricao = solicitacao.getDescricaoEquipamento() == null
                    ? "Serviço de manutenção"
                    : solicitacao.getDescricaoEquipamento();
            BigDecimal valor = solicitacao.getValorOrcamento() == null
                    ? BigDecimal.ZERO
                    : solicitacao.getValorOrcamento();

            porDia.computeIfAbsent(dataPagamento, data -> new ArrayList<>())
                    .add(new ItemReceita(descricao, valor));
        }

        return porDia.entrySet().stream()
                .map(entrada -> new ReceitaDiaria(
                        entrada.getKey(),
                        List.copyOf(entrada.getValue()),
                        entrada.getValue().stream()
                                .map(ItemReceita::valor)
                                .reduce(BigDecimal.ZERO, BigDecimal::add)))
                .toList();
    }

    public List<ReceitaCategoria> buscarReceitaPorCategoria() {
        Map<String, AcumuladoCategoria> porCategoria = new LinkedHashMap<>();

        for (Solicitacao solicitacao : solicitacaoRepository.buscarTodasPagas()) {
            String categoria = solicitacao.getCategoria() == null
                    || solicitacao.getCategoria().getNome() == null
                    || solicitacao.getCategoria().getNome().isBlank()
                    ? "Sem categoria"
                    : solicitacao.getCategoria().getNome().trim();
            BigDecimal valor = solicitacao.getValorOrcamento() == null
                    ? BigDecimal.ZERO
                    : solicitacao.getValorOrcamento();

            AcumuladoCategoria acumulado = porCategoria.computeIfAbsent(categoria,
                    nome -> new AcumuladoCategoria());
            acumulado.total = acumulado.total.add(valor);
            acumulado.quantidade++;
        }

        return porCategoria.entrySet().stream()
                .map(entrada -> new ReceitaCategoria(
                        entrada.getKey(),
                        entrada.getValue().total,
                        entrada.getValue().quantidade))
                .sorted((a, b) -> b.total().compareTo(a.total()))
                .toList();
    }

    public record ItemReceita(String descricao, BigDecimal valor) {
    }

    public record ReceitaDiaria(LocalDate data, List<ItemReceita> itens, BigDecimal total) {
    }

    public record ReceitaCategoria(String categoria, BigDecimal total, int quantidade) {
    }

    private static class AcumuladoCategoria {
        private BigDecimal total = BigDecimal.ZERO;
        private int quantidade;
    }
}
