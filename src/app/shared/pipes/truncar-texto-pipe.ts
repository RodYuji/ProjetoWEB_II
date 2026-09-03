import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncarTexto',
})
export class TruncarTextoPipe implements PipeTransform {
  transform(value: string | undefined ): string {
    if (value && value.length > 30) {
      let cortado = value.slice(0, 30);
      cortado = cortado.replace(/[.,;:!?\s]+$/, '');
      return cortado + '...';
    } else {
      return value ?? '';
    }
  }
}
