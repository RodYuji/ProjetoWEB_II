import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoFuncionariosComponent } from './gerenciamento-funcionarios.component';

describe('GerenciamentoFuncionariosComponent', () => {
  let component: GerenciamentoFuncionariosComponent;
  let fixture: ComponentFixture<GerenciamentoFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciamentoFuncionariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoFuncionariosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
