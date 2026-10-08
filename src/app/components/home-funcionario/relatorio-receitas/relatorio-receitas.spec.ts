import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RelatorioReceitas } from './relatorio-receitas';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

describe('RelatorioReceitas', () => {
  let component: RelatorioReceitas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitas],
      providers: [SolicitacaoService, provideRouter([])],
    }).compileComponents();

    const fixture: ComponentFixture<RelatorioReceitas> = TestBed.createComponent(RelatorioReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //logica para agrupar os pagamentos por dias
  it('agrupa somente pagamentos por dia', () => {
    expect(component.receitas.length).toBeGreaterThan(0);
    expect(component.totalReceitas).toBeGreaterThan(0);
    expect(component.receitas[0].total).toBeGreaterThan(0);
  });

  it('filtra por intervalo de datas', () => {
    component.dataInicial = '2026-08-07';
    component.dataFinal = '2026-08-10';
    component.aplicarFiltro();

    expect(component.receitas.length).toBeGreaterThan(0);
    expect(component.mensagemErro).toBe('');
  });

  it('gera o PDF do relatório sem lançar erros', () => {
    component.dataInicial = '2026-08-01';
    component.dataFinal = '2026-08-12';
    component.aplicarFiltro();

    expect(() => component.gerarPdf()).not.toThrow();
  });

  it('gera relatórios extensos sem erros', () => {
    component.receitas = Array.from({ length: 24 }, () => ({
      data: '2026-08-01',
      total: 500,
      itens: Array.from({ length: 5 }, (_, indice) => ({
        descricao: `Serviço detalhado ${indice} ${'com descrição complementar '.repeat(5)}`,
        valor: 100,
      })),
    }));
    component.totalReceitas = 12000;

    expect(() => component.gerarPdf()).not.toThrow();
  });
});
