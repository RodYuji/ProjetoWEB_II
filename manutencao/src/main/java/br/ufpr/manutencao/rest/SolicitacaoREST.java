package br.ufpr.manutencao.rest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.ufpr.manutencao.model.Categoria;
import br.ufpr.manutencao.model.Cliente;
import br.ufpr.manutencao.model.Estado;
import br.ufpr.manutencao.model.Funcionario;
import br.ufpr.manutencao.model.Solicitacao;
import br.ufpr.manutencao.model.Historico;
import br.ufpr.manutencao.repository.CategoriaRepository;
import br.ufpr.manutencao.repository.ClienteRepository;
import br.ufpr.manutencao.repository.EstadoRepository;
import br.ufpr.manutencao.repository.FuncionarioRepository;
import br.ufpr.manutencao.repository.SolicitacaoRepository;
import br.ufpr.manutencao.service.HistoricoService;


@CrossOrigin
@RestController
public class SolicitacaoREST {

    // Repositorios injetado pelo Spring
    @Autowired
    private SolicitacaoRepository repo;

    @Autowired
    private EstadoRepository estadoRepo;

    @Autowired
    private ClienteRepository clienteRepo;

    @Autowired
    private CategoriaRepository categoriaRepo;

    @Autowired
    private FuncionarioRepository funcionarioRepo;

    @Autowired
    private HistoricoService historicoService;

    //TODAS AS SOLICITAÇÕES
    @GetMapping ("/solicitacoes/funcionario/{id}")
    public ResponseEntity<List<Solicitacao>> obterTodasSolicitacoes(@PathVariable("id") int id){
        List <Solicitacao> lista = repo.findAllByOrderByDataHoraAsc();
        return ResponseEntity.ok(semRedirecionadasDeOutros(lista, id));
    }

    //SOLICITAÇÕES POR PERÍODO
    @GetMapping ("/solicitacoes/funcionario/{id}/{inicio}/{fim}")
    public ResponseEntity<List<Solicitacao>> obterPorPeriodo(@PathVariable("id") int id, @PathVariable("inicio") String inicio, @PathVariable("fim") String fim){
        LocalDateTime de = LocalDate.parse(inicio).atStartOfDay();
        LocalDateTime ate = LocalDate.parse(fim).plusDays(1).atStartOfDay().minusNanos(1);
        List<Solicitacao> lista = repo.findByDataHoraBetweenOrderByDataHoraAsc(de, ate);
        return ResponseEntity.ok(semRedirecionadasDeOutros(lista, id));
    }

    //SOLICITAÇÕES ABERTAS
    @GetMapping("/solicitacoes/abertas")
    public ResponseEntity<List<Solicitacao>> obterTodasSolicitacoesAbertas() {
        return ResponseEntity.ok(repo.findByEstadoNomeOrderByDataHoraAsc(Estado.ABERTA));
    }

    //SOLICITACOES POR ID
    @GetMapping("/solicitacoes/{id}")
    public ResponseEntity<Solicitacao> obterSolicitacaoPorId(@PathVariable("id") int id) {
        Solicitacao s = repo.findById(id).orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.ok(s);
    }

    //SOLICITACOES POR CLIENTE 
    @GetMapping("/solicitacoes/cliente/{id}")
    public ResponseEntity<List<Solicitacao>> obterSolicitacoesDoCliente (@PathVariable("id") int id){
        return ResponseEntity.ok(repo.findByClienteIdOrderByDataHoraAsc(id));
    }

    //INSERIR 
    @PostMapping("/solicitacoes")
    public ResponseEntity<Solicitacao> inserir(@RequestBody Solicitacao solicitacao){
        if (solicitacao.getCliente() == null || solicitacao.getCategoria() == null
                || vazio(solicitacao.getDescricaoEquipamento())
                || solicitacao.getDescricaoEquipamento().trim().length() > 100
                || vazio(solicitacao.getDescricaoDefeito())
                || solicitacao.getDescricaoDefeito().trim().length() > 500)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        
        Cliente cliente = clienteRepo.findById(solicitacao.getCliente().getId()).orElse(null);
        Categoria categoria = categoriaRepo.findById(solicitacao.getCategoria().getId()).orElse(null);
        if (cliente == null || categoria == null || !categoria.isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        Solicitacao s = new Solicitacao();
        Estado aberta = estadoRepo.findByNome(Estado.ABERTA).orElse(null);
        s.setCliente(cliente);
        s.setCategoria(categoria);
        s.setDescricaoEquipamento(solicitacao.getDescricaoEquipamento().trim());
        s.setDescricaoDefeito(solicitacao.getDescricaoDefeito().trim());
        s.setDataHora(LocalDateTime.now());
        s.setEstado(aberta);
        s = repo.save(s);

        historicoService.registrar(s, null, aberta, null, null, null);
        return ResponseEntity.status(HttpStatus.CREATED).body(s);
    }

    //ORÇAMENTO
    @PutMapping("/solicitacoes/{id}/orcar")
    public ResponseEntity<Solicitacao> orcar(@PathVariable("id") int id, @RequestBody Solicitacao solicitacao){
        if (solicitacao.getValorOrcamento() == null || solicitacao.getValorOrcamento().compareTo(BigDecimal.ZERO) <= 0 || solicitacao.getFuncionarioOrcamento() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        Solicitacao s = repo.findById(id).orElse(null);
        Funcionario f = funcionarioRepo.findById(solicitacao.getFuncionarioOrcamento().getId()).orElse(null);
        if (s == null || f == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.ABERTA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        
        s.setValorOrcamento(solicitacao.getValorOrcamento());
        s.setFuncionarioOrcamento(f);
        s.setDataHoraOrcamento(LocalDateTime.now());
        return ResponseEntity.ok(mudarEstado(s, Estado.ORCADA, f, null, null));
    }

    //ORÇAMENTO APROVADO
    @PutMapping("/solicitacoes/{id}/aprovar")
    public ResponseEntity<Solicitacao> aprovar(@PathVariable("id") int id){
        Solicitacao s = repo.findById(id).orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if(!s.getEstado().getNome().equals(Estado.ORCADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        return ResponseEntity.ok(mudarEstado(s, Estado.APROVADA, null, null, null));
    }

    //ORCAMENTO REJEITADO
    @PutMapping("/solicitacoes/{id}/rejeitar")
    public ResponseEntity<Solicitacao> rejeitar(@PathVariable("id") int id, @RequestBody Historico historico){
        if (vazio(historico.getObservacao()) || historico.getObservacao().trim().length() > 500)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        Solicitacao s = repo.findById(id).orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.ORCADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        return ResponseEntity.ok(mudarEstado(s, Estado.REJEITADA, null, null, historico.getObservacao().trim()));
    }

    //ORÇAMENTO RESGATADO
    @PutMapping("/solicitacoes/{id}/resgatar")
    public ResponseEntity<Solicitacao> resgatar(@PathVariable("id") int id){
        Solicitacao s = repo.findById(id).orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.REJEITADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        return ResponseEntity.ok(mudarEstado(s, Estado.APROVADA, null, null, "Serviço resgatado pelo cliente."));
    }

    //ARRUMADA - MANUTENCAO
    @PutMapping("/solicitacoes/{id}/arrumar")
    public ResponseEntity<Solicitacao> arrumar(@PathVariable("id") int id, @RequestBody Solicitacao solicitacao){
        if (vazio(solicitacao.getDescricaoManutencao()) || solicitacao.getDescricaoManutencao().trim().length() > 500
        || vazio(solicitacao.getOrientacoesCliente()) || solicitacao.getOrientacoesCliente().trim().length() > 500
        || solicitacao.getFuncionarioManutencao() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        
        Solicitacao s = repo.findById(id).orElse(null);
        Funcionario f = funcionarioRepo.findById(solicitacao.getFuncionarioManutencao().getId()).orElse(null);

        if (s == null || f == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.APROVADA) && !s.getEstado().getNome().equals(Estado.REDIRECIONADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        if (redirecionadaParaOutro(s, f))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        s.setDescricaoManutencao(solicitacao.getDescricaoManutencao().trim());
        s.setOrientacoesCliente(solicitacao.getOrientacoesCliente().trim());
        s.setFuncionarioManutencao(f);
        s.setDataHoraManutencao(LocalDateTime.now());

        return ResponseEntity.ok(mudarEstado(s, Estado.ARRUMADA, f, null, null));
    }

    //REDIRECIONADA 
    @PutMapping("/solicitacoes/{id}/redirecionar")
    public ResponseEntity<Solicitacao> redirecionar(@PathVariable("id") int id, @RequestBody Historico historico){
        if (historico.getFuncionario() == null || historico.getFuncionarioDestino() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        Solicitacao s = repo.findById(id).orElse(null);
        Funcionario origem = funcionarioRepo.findById(historico.getFuncionario().getId()).orElse(null);
        Funcionario destino = funcionarioRepo.findById(historico.getFuncionarioDestino().getId()).orElse(null);

        if (s == null || origem == null || destino == null || !destino.isAtivo())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (origem.getId().equals(destino.getId()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        if (!s.getEstado().getNome().equals(Estado.APROVADA)
                && !s.getEstado().getNome().equals(Estado.REDIRECIONADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        if (redirecionadaParaOutro(s, origem))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        s.setFuncionarioResponsavel(destino);
        return ResponseEntity.ok(mudarEstado(s, Estado.REDIRECIONADA, origem, destino, null));
    }

    //PAGAR
    @PutMapping ("/solicitacoes/{id}/pagar")
    public ResponseEntity<Solicitacao> pagar(@PathVariable("id") int id){
        Solicitacao s = repo.findById(id).orElse(null);
        if (s == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.ARRUMADA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        s.setDataHoraPagamento(LocalDateTime.now());
        return ResponseEntity.ok(mudarEstado(s, Estado.PAGA, null, null, null));
    }

    //FINALIZADA
    @PutMapping ("/solicitacoes/{id}/finalizar")
    public ResponseEntity<Solicitacao> finalizar(@PathVariable("id") int id, @RequestBody Solicitacao solicitacao){
        if (solicitacao.getFuncionarioFinalizacao() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        Solicitacao s = repo.findById(id).orElse(null);
        Funcionario f = funcionarioRepo.findById(solicitacao.getFuncionarioFinalizacao().getId()).orElse(null);

        if (s == null || f == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!s.getEstado().getNome().equals(Estado.PAGA))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        s.setFuncionarioFinalizacao(f);
        s.setDataHoraFinalizacao(LocalDateTime.now());
        return ResponseEntity.ok(mudarEstado(s, Estado.FINALIZADA, f, null, null));
    }
    
    //MÉTODOS AUXILIARES
    private Solicitacao mudarEstado(Solicitacao s, String nomeNovo, Funcionario funcionario, Funcionario destino, String observacao){
        Estado anterior = s.getEstado();
        Estado novo = estadoRepo.findByNome(nomeNovo).orElse(null);
        s.setEstado(novo);
        s = repo.save(s);
        historicoService.registrar(s, anterior, novo, funcionario, destino, observacao);
        return s;
    } 

    private boolean redirecionadaParaOutro(Solicitacao s, Funcionario f){
        return s.getEstado().getNome().equals(Estado.REDIRECIONADA) && s.getFuncionarioResponsavel() != null && !s.getFuncionarioResponsavel().getId().equals(f.getId());
    }

    private List<Solicitacao> semRedirecionadasDeOutros(List<Solicitacao> lista, int idFuncionario){
        return lista.stream().filter(
            sol -> !sol.getEstado().getNome().equals(Estado.REDIRECIONADA) || sol.getFuncionarioResponsavel().getId() == idFuncionario).toList();
    }

    private boolean vazio(String valor){
        return valor == null || valor.trim().isEmpty();
    }
}