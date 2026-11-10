import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RelatorioReceitas } from './relatorio-receitas';
import { ReceitaDiaria } from '../../../shared/services/relatorio.service';

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
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RelatorioReceitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTesting.expectOne('http://localhost:8080/api/relatorios/receita-dia').flush(receitas);
  });

  afterEach(() => httpTesting.verify());

  it('exibe os valores agrupados por dia retornados pela API', () => {
    expect(component.receitas()).toEqual(receitas);
    expect(component.totalReceitas()).toBe(250);
    expect(component.formatarData(component.receitas()[0].data)).toBe('07/08/2026');
  });

  it('envia filtros opcionais para a API e atualiza o total', () => {
    component.dataInicial = '2026-08-07';
    component.dataFinal = '2026-08-10';
    component.aplicarFiltro();

    const request = httpTesting.expectOne(
      'http://localhost:8080/api/relatorios/receita-dia?inicio=2026-08-07&fim=2026-08-10',
    );
    request.flush(receitas);

    expect(component.totalReceitas()).toBe(250);
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

  it('formata valores monetários no padrão brasileiro', () => {
    expect(component.formatarMoeda(1234.5)).toBe('R$ 1.234,50');
  });
});
