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
    expect(component.receitas).toHaveLength(1);
    expect(component.receitas[0].data).toBe('2026-08-23');
    expect(component.totalReceitas).toBe(0);
  });

  //logica para filtrar por intervalo de datas
  it('filtra por intervalo de datas', () => {
    component.dataInicial = '2026-08-24';
    component.dataFinal = '2026-08-31';
    component.aplicarFiltro();

    expect(component.receitas).toHaveLength(0);
    expect(component.mensagemErro).toBe('');
  });
});
