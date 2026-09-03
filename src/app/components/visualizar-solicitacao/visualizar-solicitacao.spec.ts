import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitacao } from './visualizar-solicitacao';

describe('VisualizarSolicitacao', () => {
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
});
