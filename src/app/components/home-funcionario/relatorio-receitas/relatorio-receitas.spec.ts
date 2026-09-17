import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioReceitas } from './relatorio-receitas';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

describe('RelatorioReceitas', () => {
  let component: RelatorioReceitas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioReceitas],
      providers: [SolicitacaoService],
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
});
