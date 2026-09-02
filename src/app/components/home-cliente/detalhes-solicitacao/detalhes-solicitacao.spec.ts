import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSolicitacao } from './detalhes-solicitacao';

describe('DetalhesSolicitacao', () => {
  let component: DetalhesSolicitacao;
  let fixture: ComponentFixture<DetalhesSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesSolicitacao],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesSolicitacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
