import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RelatorioReceitas } from './relatorio-receitas';
import { ReceitaDiaria } from '../../../shared/services/relatorio.service';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';

// Solicitações falsas: o teste não depende do Spring rodando
function solicitacaoPaga(id: number, dataHoraPagamento: string, valor: number): Solicitacao {
  const s = new Solicitacao();
  s.id = id;
  s.descricaoEquipamento = 'Equipamento ' + id;
  s.valorOrcamento = valor;
  s.dataHoraPagamento = dataHoraPagamento;
  return s;
}

const SOLICITACOES: Solicitacao[] = [
  solicitacaoPaga(1, '2026-08-08T10:00:00', 150),
  solicitacaoPaga(2, '2026-08-08T15:30:00', 200),
  solicitacaoPaga(3, '2026-08-09T09:00:00', 300),
  new Solicitacao(),   // sem pagamento: não entra na receita
];

describe('RelatorioReceitas', () => {
  let component: RelatorioReceitas;
  let fixture: ComponentFixture<RelatorioReceitas>;
  let httpTesting: HttpTestingController;

  const receitas: ReceitaDiaria[] = [{
    data: '2026-08-07',
    itens: [{ descricao: 'Notebook', valor: 250 }],
    total: 250,
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitas],
      providers: [
        { provide: SolicitacaoService, useValue: { listarTodas: () => of(SOLICITACOES) } },
        provideRouter([]),
        provideHttpClient(),   // o LoginService usa HttpClient
      ],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RelatorioReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTesting.expectOne('http://localhost:8080/api/relatorios/receita-dia').flush(receitas);
  });

  //logica para agrupar os pagamentos por dias
  it('agrupa somente pagamentos por dia', () => {
    expect(component.receitas().length).toBe(2);
    expect(component.totalReceitas()).toBe(650);
    expect(component.receitas()[0].total).toBe(350);
  });

  it('envia filtros opcionais para a API e atualiza o total', () => {
    component.dataInicial = '2026-08-07';
    component.dataFinal = '2026-08-08';
    component.aplicarFiltro();

    expect(component.receitas().length).toBe(1);
    expect(component.mensagemErro).toBe('');
  });

  it('rejeita intervalo inválido sem consultar a API', () => {
    component.dataInicial = '2026-08-11';
    component.dataFinal = '2026-08-10';
    component.aplicarFiltro();

    expect(component.mensagemErro).toBe('A data inicial deve ser anterior ou igual à data final.');
    expect(component.receitas()).toEqual([]);
    expect(component.totalReceitas()).toBe(0);
  });

  it('mostra erro se a API não puder carregar o relatório', () => {
    component.aplicarFiltro();
    httpTesting.expectOne('http://localhost:8080/api/relatorios/receita-dia')
      .flush('Falha', { status: 500, statusText: 'Erro interno' });

    expect(component.mensagemErro).toBe('Não foi possível carregar o relatório. Tente novamente.');
    expect(component.receitas()).toEqual([]);
  });

  it('gera relatórios extensos sem erros', () => {
    component.receitas.set(Array.from({ length: 24 }, () => ({
      data: '2026-08-01',
      total: 500,
      itens: Array.from({ length: 5 }, (_, indice) => ({
        descricao: `Serviço detalhado ${indice} ${'com descrição complementar '.repeat(5)}`,
        valor: 100,
      })),
    })));
    component.totalReceitas.set(12000);

    expect(() => component.gerarPdf()).not.toThrow();
  });
});