import { ChangeDetectionStrategy, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, of, Subject, timer } from 'rxjs';
import { debounce, debounceTime, filter, map } from 'rxjs/operators';
import { StreamComponent } from '../../components/stream/stream';

@Component({
  selector: 'rxp-puzzle',
  templateUrl: 'puzzle.html',
  styleUrls: ['puzzle.scss']
})
export class PuzzleComponent {

  @ViewChildren(StreamComponent)
  set streamComponent(value: QueryList<StreamComponent>) {
    this.streams = value.toArray().map((item) => item.observableDropList);
  }

  streams;
  solution: any[] = [];
  solutionOperators: any[] = [];

  sources: any[] = [
    {
      title: 'interval(10)',
      stream: (scheduler) => {
        return interval(10, scheduler);
      }
    },
  ];

  operators: any[] = [
    {
      title: 'debounceTime(...)',
      operator: (scheduler) => debounceTime(5, scheduler),
      argumentsType: 'number'
    },
    {
      title: 'debounceTime(...)',
      operator: (scheduler) => debounceTime(10, scheduler),
      argumentsType: 'number'
    },
    {
      title: 'filter(...)',
      operator: (scheduler) => filter((x) => x > 3),
      argumentsType: 'function'
    },
    {
      title: 'map(...)',
      operator: (scheduler) => map((x: any) => (x + 10)),
      argumentsType: 'function'
    },
    {
      title: 'switchMap(...)',
      operator: (scheduler) => map((x: any) => (x + 10)),
      argumentsType: 'observable'
    }
  ];

  values: any[] = [
    5, 10, (x) => x > 3, (x) => x + 10
  ];

  source$ = new Subject();

  destination = (scheduler) => {
    return interval(10, scheduler).pipe(debounceTime(5, scheduler));
  }

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

      this.source$.next(this.solution[0]);
    }
  }

  dropSource(event: CdkDragDrop<string[]>) {
    if (event.container.data.length) {
      this.moveOutSource(event.container.data,
        event.previousContainer.data,
        0,
        0);
    }

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex + 1,
      0);

    this.source$.next(this.solution[0]);
  }

  moveOutSource(prevContainer, container, prevIndex, index) {
    transferArrayItem(prevContainer,
      container,
      prevIndex,
      index);
  }
}
