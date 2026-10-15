import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NumericoDirective } from './numerico.directive';

describe('NumericoDirective', () => {
  it('should create an instance', () => {
    // a diretiva usa inject(ElementRef), então precisa ser criada num contexto de injeção
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('input')) }]
    });
    const directive = TestBed.runInInjectionContext(() => new NumericoDirective());
    expect(directive).toBeTruthy();
  });
});
