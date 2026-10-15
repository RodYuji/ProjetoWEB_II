import { Directive, HostListener, ElementRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[numerico]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumericoDirective,
    multi: true
  }]
})
export class NumericoDirective implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  private el = inject(ElementRef);

  constructor() { }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor = $event.target.value;
    // expressão regular: remove tudo que não é número
    valor = valor.replace(/[\D]/g, '');
    $event.target.value = valor;
    // atualiza o model
    this.onChange(valor);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }
}
