import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Máscara de digitação 
 *     mascara="(00) 0000-0000|(00) 00000-0000"
 */
@Directive({
  selector: '[mascara]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MascaraDirective,
    multi: true
  }]
})
export class MascaraDirective implements ControlValueAccessor {

  @Input('mascara') mascara: string = '';

  private el = inject(ElementRef);
  private onChange: (valor: string) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('input')
  aoDigitar() {
    const valor: string = this.el.nativeElement.value;
    const digitos = this.limitar(valor.replace(/\D/g, ''));
    this.el.nativeElement.value = this.formatar(digitos);
    this.onChange(digitos);
  }

  @HostListener('blur')
  aoSair() {
    this.onTouched();
  }

  writeValue(valor: any): void {
    const digitos = this.limitar(String(valor ?? '').replace(/\D/g, ''));
    this.el.nativeElement.value = this.formatar(digitos);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(desabilitado: boolean): void {
    this.el.nativeElement.disabled = desabilitado;
  }

  private mascaras(): string[] {
    return this.mascara.split('|');
  }

  private capacidade(m: string): number {
    return (m.match(/0/g) || []).length;
  }

  private limitar(digitos: string): string {
    const max = Math.max(...this.mascaras().map(m => this.capacidade(m)));
    return digitos.substring(0, max);
  }

  private formatar(digitos: string): string {
    if (!digitos) return '';
    const lista = this.mascaras();
    const m = lista.find(x => this.capacidade(x) >= digitos.length) ?? lista[lista.length - 1];
    let resultado = '';
    let i = 0;
    for (const c of m) {
      if (i >= digitos.length) break;
      resultado += (c === '0') ? digitos[i++] : c;
    }
    return resultado;
  }
}
