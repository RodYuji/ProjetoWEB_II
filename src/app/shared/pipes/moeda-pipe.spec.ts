import { MoedaPipe } from './moeda-pipe';

describe('MoedaPipe', () => {
  const pipe = new MoedaPipe();

  it('formata no padrão brasileiro', () => {
    expect(pipe.transform(1500.5).replace(/\s/g, ' ')).toBe('R$ 1.500,50');
    expect(pipe.transform(150).replace(/\s/g, ' ')).toBe('R$ 150,00');
  });

  it('devolve vazio quando não há valor', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
