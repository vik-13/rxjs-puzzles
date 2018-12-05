import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'rxp-bead',
  templateUrl: 'bead.html',
  styleUrls: ['bead.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeadComponent {
  @Input()
  get element() {
    return this._element;
  }
  set element(value) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${value.time}%`);
    this._element = value;
  }
  private _element;

  @HostBinding('class.rxp-bead') rxpBeadClass = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
