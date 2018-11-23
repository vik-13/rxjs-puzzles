import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'rxp-puzzle',
  templateUrl: 'puzzle.html',
  styleUrls: ['puzzle.scss']
})
export class PuzzleComponent {

  tree = {
    root: [],
    operators: [],
  };

  sources: any[] = [
    {
      title: 'interval(10)',
      stream: (scheduler) => {
        return interval(10, scheduler);
      }
    }
  ];

  operators: any[] = [
    {
      id: 0,
      operator: {
        title: 'debounceTime(...)',
        firstPart: 'debounceTime(',
        secondPart: ')',
        operator: (arg, scheduler) => debounceTime(arg, scheduler),
        argumentsType: 'number',
        required: true,
      },
      value: []
    },
    {
      id: 1,
      operator: {
        title: 'filter(...)',
        firstPart: 'filter(',
        secondPart: ')',
        operator: (arg, scheduler) => filter(arg),
        argumentsType: 'function',
        required: true,
      },
      value: []
    }, {
      id: 2,
      operator: {
        title: 'map(...)',
        firstPart: 'map(',
        secondPart: ')',
        operator: (arg, scheduler) => map(arg),
        argumentsType: 'function',
        required: true,
      },
      value: []
    }, {
      id: 3,
      operator: {
        title: 'switchMap(...)',
        firstPart: 'switchMap(',
        secondPart: ')',
        operator: (scheduler) => map((x: any) => (x + 10)),
        argumentsType: 'observable',
        required: true,
      },
      value: []
    }
  ];

  values: any[] = [
    {
      title: '5',
      value: 5
    },
    {
      title: '10',
      value: 10
    },
    {
      title: '(x) => x > 3',
      value: (x) => x > 3
    },
    {
      title: '(x) => x + 10',
      value: (x) => x + 10
    }
  ];

  source$ = new Subject();

  destination = (scheduler) => {
    return interval(10, scheduler).pipe(debounceTime(5, scheduler));
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropObservable(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  dropOperator(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  dropValue(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  getIds(index = -1) {
    const idsList = [];
    if (index !== -1) {
      idsList.push('src-values');
    }
    for (let i = 0; i < 32; i++) {
      if (index !== i) {
        idsList.push(`dest-value-${i}`);
      }
    }
    return idsList;
  }

  dblClickObservable(event) {
    this.transferObservable();

    this.source$.next(this.tree);
  }

  dblClickOperator(event, container, index) {
    this.transferOperator(container, index);

    this.source$.next(this.tree);
  }

  dblClickValue(event, container, index) {
    event.stopPropagation();
    this.transferValue(container, index);
    this.source$.next(this.tree);
  }

  transferObservable() {
    for (let i = this.tree.operators.length - 1; i >= 0; i--) {
      this.transferOperator(this.tree.operators, i);
    }
    transferArrayItem(this.tree.root,
      this.sources,
      0,
      this.sources.length);
  }

  transferOperator(container, index) {
    if (container[index].value.length) {
      for (let i = container[index].value.length - 1; i >= 0; i--) {
        this.transferValue(container[index].value, i);
      }
    }
    transferArrayItem(container,
      this.operators,
      index,
      this.operators.length);
  }

  transferValue(container, index) {
    transferArrayItem(container,
      this.values,
      index,
      this.values.length);
  }
}
