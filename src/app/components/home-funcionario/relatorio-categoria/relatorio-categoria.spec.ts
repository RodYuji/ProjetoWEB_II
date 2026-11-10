import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RelatorioCategoria } from './relatorio-categoria';

describe('RelatorioCategoria', () => {
  let component: RelatorioCategoria;
  let fixture: ComponentFixture<RelatorioCategoria>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioCategoria],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RelatorioCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTesting.expectOne('http://localhost:8080/api/relatorios/receita-categoria').flush([
      { categoria: 'Notebooks', total: 1500, quantidade: 3 },
      { categoria: 'Impressoras', total: 500, quantidade: 1 },
    ]);
  });

  afterEach(() => httpTesting.verify());

  it('exibe o histórico completo agrupado por categoria', () => {
    expect(component.categorias()).toEqual([
      { categoria: 'Notebooks', total: 1500, quantidade: 3 },
      { categoria: 'Impressoras', total: 500, quantidade: 1 },
    ]);
    expect(component.totalReceitas()).toBe(2000);
  });

  it('formata valores monetários no padrão brasileiro', () => {
    expect(component.formatarMoeda(1234.5)).toBe('R$ 1.234,50');
  });
});
