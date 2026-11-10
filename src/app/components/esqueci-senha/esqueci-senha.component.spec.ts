import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquecerSenhaComponent } from './esqueci-senha.component';

describe('EsqueciSenhaComponent', () => {
  let component: EsquecerSenhaComponent;
  let fixture: ComponentFixture<EsquecerSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsquecerSenhaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EsquecerSenhaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
