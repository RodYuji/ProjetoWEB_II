import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoCategoriasComponent } from './gerenciamento-categorias.component';

describe('GerenciamentoCategoriasComponent', () => {
  let component: GerenciamentoCategoriasComponent;
  let fixture: ComponentFixture<GerenciamentoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciamentoCategoriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoCategoriasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
