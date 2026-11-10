import { Pipe, PipeTransform } from '@angular/core';

// Formata valores monetários no padrão brasileiro: 1500.5 -> "R$ 1.500,50"
@Pipe({
  name: 'moeda',
})
export class MoedaPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value == null || value === '') {
      return '';
    }
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
