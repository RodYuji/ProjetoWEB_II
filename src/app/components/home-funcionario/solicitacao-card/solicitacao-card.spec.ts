import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoCard } from './solicitacao-card';

describe('SolicitacaoCard', () => {
  let component: SolicitacaoCard;
  let fixture: ComponentFixture<SolicitacaoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitacaoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
