import { TestBed } from '@angular/core/testing';

import { SolicitacaoService } from './solicitacao-cliente.service';

describe('SolicitacaoService', () => {
  let service: SolicitacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
