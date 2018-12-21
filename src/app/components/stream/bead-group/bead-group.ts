import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'rxp-bead-group',
  templateUrl: 'bead-group.html',
  styleUrls: ['bead-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeadGroupComponent {
  @Input() isEqual;

  @Input()
  get group() { return this._group; }
  set group(value: {time: number, beads: any[]}) {
    this._renderer.setStyle(this._elementRef.nativeElement, 'left', `${value.time}%`);
    this._group = value;
  }
  private _group: {time: number, beads: any[]};

  active = false;

  @HostBinding('class.rxp-bead-group') rxpBeadGroupClass = true;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  onMouseEnter() {
    this.active = true;
  }

  onMouseLeave() {
    this.active = false;
  }
}
