import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        backgroundColor: '#BC2D19'
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

  ticks: {value: number, left: string, visible: boolean}[] = [];

  constructor() {
    // this.generateTicks();
  }

  generateTicks() {
    for (let i = 0; i <= 100; i++) {
      this.ticks.push({
        value: i,
        left: `${i}%`,
        visible: !(i % 5)
      });
    }
  }
}
