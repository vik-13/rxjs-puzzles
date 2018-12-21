import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'rxp-bead-group',
  templateUrl: 'bead-group.html',
  styleUrls: ['bead-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeadGroupComponent {
  @Input()
  get isEqual() { return this._isEqual; }
  set isEqual(value) {
    this._isEqual = coerceBooleanProperty(value);
  }
  private _isEqual: boolean;

  @Input()
  get preview() { return this._preview; }
  set preview(value) {
    this._preview = coerceBooleanProperty(value);
    this.previewClass = this._preview;
  }
  private _preview: boolean;

  @Input()
  get group() { return this._group; }
  set group(value: {time: number, beads: any[]}) {
    this._renderer.setStyle(this._elementRef.nativeElement, 'left', `${value.time}%`);
    this._group = value;
  }
  private _group: {time: number, beads: any[]};

  active = false;

  @HostBinding('class.rxp-bead-group') rxpBeadGroupClass = true;
  @HostBinding('class.preview') previewClass = this.preview;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  onMouseEnter() {
    this.active = true;
  }

  onMouseLeave() {
    this.active = false;
  }
}
