import { Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'rxp-stream',
  templateUrl: 'stream.html',
  styleUrls: ['stream.scss'],
  animations: [
    trigger('equality', [
      state('equal', style({
        backgroundColor: '#3D5A1F'
      })),
      state('notEqual', style({
        backgroundColor: '#303030'
      })),
      transition('equal <=> notEqual', [
        animate('.5s')
      ])
    ])
  ]
})
export class StreamComponent {
  @Input()
  get stream$() { return this._stream$; }
  set stream$(value: Observable<any>) {
    this._stream$ = value;
  }
  private _stream$: Observable<any>;

  @Input()
  get isEqual() { return this._isEqual; }
  set isEqual(value: any) {
    this._isEqual = coerceBooleanProperty(value);
  }
  private _isEqual: boolean;

  @Input()
  get preview() { return this._preview; }
  set preview(value: any) {
    this._preview = coerceBooleanProperty(value);
    this.previewClass = this._preview;
  }
  private _preview = false;

  @HostBinding('class.rxp-stream') rxpBeadClass = true;
  @HostBinding('class.preview') previewClass = this.preview;

  ticks: {value: number, left: string, visible: boolean}[] = [];

  constructor() {
    this.generateTicks();
  }

  generateTicks() {
    for (let i = 0; i <= 100; i++) {
      if (!(i % 5)) {
        this.ticks.push({
          value: i,
          left: `${i}%`,
          visible: !(i % 10)
        });
      }
    }
  }
}
