import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rxp-stream',
  templateUrl: 'stream.html',
  styleUrls: ['stream.scss']
})
export class StreamComponent {
  @Input()
  get stream$() { return this._stream$; }
  set stream$(value: Observable<any>) {
    this._stream$ = value;
  }
  private _stream$: Observable<any>;

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
