import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RelatorioReceitas } from './relatorio-receitas';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitas],
      providers: [
        { provide: SolicitacaoService, useValue: { listarTodas: () => of(SOLICITACOES) } },
        provideRouter([]),
        provideHttpClient(),   // o LoginService usa HttpClient
      ],
    }).compileComponents();

    const fixture: ComponentFixture<RelatorioReceitas> = TestBed.createComponent(RelatorioReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //logica para agrupar os pagamentos por dias
  it('agrupa somente pagamentos por dia', () => {
    expect(component.receitas().length).toBe(2);
    expect(component.totalReceitas()).toBe(650);
    expect(component.receitas()[0].total).toBe(350);
  });

  it('filtra por intervalo de datas', () => {
    component.dataInicial = '2026-08-07';
    component.dataFinal = '2026-08-08';
    component.aplicarFiltro();

    expect(component.receitas().length).toBe(1);
    expect(component.mensagemErro).toBe('');
  });

  it('gera o PDF do relatório sem lançar erros', () => {
    component.dataInicial = '2026-08-01';
    component.dataFinal = '2026-08-12';
    component.aplicarFiltro();

    expect(() => component.gerarPdf()).not.toThrow();
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