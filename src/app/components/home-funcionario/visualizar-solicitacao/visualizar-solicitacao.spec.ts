import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitacao } from './visualizar-solicitacao';

describe('VisualizarSolicitacaoComponent', () => {
  let component: VisualizarSolicitacao;
  let fixture: ComponentFixture<VisualizarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarSolicitacao],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarSolicitacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render category report button', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const categoryButton = Array.from(compiled.querySelectorAll('button')).find(
      (button) => button.textContent?.includes('Receita por categoria')
    );

    expect(categoryButton).toBeTruthy();
  });
});
