import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'rxp-bead',
  templateUrl: 'bead.html',
  styleUrls: ['bead.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeadComponent {
  @Input()
  get isEqual() { return this._isEqual; }
  set isEqual(value) {
    this._isEqual = coerceBooleanProperty(value);
    this.rxpIsEqualClass = this._isEqual;
  }
  private _isEqual: boolean;

  @Input()
  get active() { return this._active; }
  set active(value) {
    this._active = coerceBooleanProperty(value);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', this._active ? `${-105 * this.index}%` : `${-2 * this._index}px`);
  }
  private _active: boolean;

  @Input()
  get index() { return this._index; }
  set index(value) {
    this._index = coerceNumberProperty(value);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${-2 * this._index}px`);
  }
  private _index: number;

  @Input()
  get element() {
    return this._element;
  }
  set element(value) {
    this._element = value;
  }
  private _element;

  @HostBinding('class.rxp-bead') rxpBeadClass = true;
  @HostBinding('class.is-equal') rxpIsEqualClass = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
