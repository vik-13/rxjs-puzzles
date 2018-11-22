import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rxp-stream',
  exportAs: 'Stream',
  templateUrl: 'stream.html',
  styleUrls: ['stream.scss']
})
export class StreamComponent {

  dropListId = `drop-list-${+new Date}`;
  operatorsDropListId = `operators-drop-list-${+new Date}`;

  @Input() observableSource;
  @Input() operatorsSource;

  @ViewChild('observableDropList')
  get observableDropList(): CdkDropList { return this._observableDropList; }
  set observableDropList(value: CdkDropList) {
    this._observableDropList = value;
  }
  private _observableDropList: CdkDropList;

  @ViewChild('operatorsDropList')
  get operatorsDropList(): CdkDropList { return this._operatorsDropList; }
  set operatorsDropList(value: CdkDropList) {
    this._operatorsDropList = value;
  }
  private _operatorsDropList: CdkDropList;

  observable = [];
  operators = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousIndex,
        event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
