import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Máscara de digitação (enunciado: "campos com formatação devem possuir máscara").
 *
 * Uso: <input [(ngModel)]="cliente().cpf" mascara="000.000.000-00">
 *   - "0" representa um dígito; os outros caracteres são inseridos automaticamente.
 *   - Várias máscaras separadas por "|" (ex.: telefone fixo e celular):
 *     mascara="(00) 0000-0000|(00) 00000-0000" -> usa a menor que comporta os dígitos.
 *
 * Na tela aparece formatado (123.456.789-01), mas o model recebe só os dígitos
 * (12345678901), que é o que o back-end grava no banco.
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

  // A cada tecla (ou colagem): pega só os dígitos, formata na tela e manda os dígitos ao model
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

  // Valor vindo do model (ex.: ao carregar dados): mostra formatado
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

  // Quantos dígitos cabem na máscara
  private capacidade(m: string): number {
    return (m.match(/0/g) || []).length;
  }

  // Não deixa digitar mais dígitos do que cabem na maior máscara
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
