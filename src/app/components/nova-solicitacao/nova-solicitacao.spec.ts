import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSolicitacao } from './nova-solicitacao';

describe('NovaSolicitacao', () => {
  let component: NovaSolicitacao;
  let fixture: ComponentFixture<NovaSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaSolicitacao],
    }).compileComponents();

    fixture = TestBed.createComponent(NovaSolicitacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
