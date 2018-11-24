import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject, timer } from 'rxjs';
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

  observables: any[] = [
    {
      title: 'interval(10)',
      stream: (scheduler) => {
        return interval(10, scheduler);
      }
    },
    {
      title: 'timer(0, 10)',
      stream: (scheduler) => {
        return timer(0, 10, scheduler);
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

  dropObservableBack(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferObservable(event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  dropOperatorBack(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferOperator(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  dropArgBack(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferValue(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.source$.next(this.tree);
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

  dropArg(event: CdkDragDrop<any>) {
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
      idsList.push('src-arguments');
    }
    for (let i = 0; i < 32; i++) {
      if (index !== i) {
        idsList.push(`dest-argument-${i}`);
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

  dblClickArg(event, container, index) {
    event.stopPropagation();
    this.transferValue(container, index);
    this.source$.next(this.tree);
  }

  transferObservable(nextIndex = this.observables.length) {
    for (let i = this.tree.operators.length - 1; i >= 0; i--) {
      this.transferOperator(this.tree.operators, i);
    }
    transferArrayItem(this.tree.root,
      this.observables,
      0,
      nextIndex);
  }

  transferOperator(container, index, nextIndex = this.operators.length) {
    if (container[index].value.length) {
      for (let i = container[index].value.length - 1; i >= 0; i--) {
        this.transferValue(container[index].value, i);
      }
    }
    transferArrayItem(container,
      this.operators,
      index,
      nextIndex);
  }

  transferValue(container, index, nextIndex = this.values.length) {
    transferArrayItem(container,
      this.values,
      index,
      nextIndex);
  }
}
