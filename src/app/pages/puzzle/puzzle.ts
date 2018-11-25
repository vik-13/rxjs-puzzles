import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject, timer } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { PuzzlesService } from '../../puzzles/puzzles.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  // observables: any[] = [
  //   {
  //     title: 'interval(10)',
  //     stream: (scheduler) => {
  //       return interval(10, scheduler);
  //     }
  //   },
  //   {
  //     title: 'timer(0, 10)',
  //     stream: (scheduler) => {
  //       return timer(0, 10, scheduler);
  //     }
  //   }
  // ];
  //
  // operators: any[] = [
  //   {
  //     id: 0,
  //     operator: {
  //       title: 'debounceTime(...)',
  //       firstPart: 'debounceTime(',
  //       secondPart: ')',
  //       operator: (arg, scheduler) => debounceTime(arg, scheduler),
  //       argumentsType: 'number',
  //       required: true,
  //     },
  //     value: []
  //   },
  //   {
  //     id: 1,
  //     operator: {
  //       title: 'filter(...)',
  //       firstPart: 'filter(',
  //       secondPart: ')',
  //       operator: (arg, scheduler) => filter(arg),
  //       argumentsType: 'function',
  //       required: true,
  //     },
  //     value: []
  //   }, {
  //     id: 2,
  //     operator: {
  //       title: 'map(...)',
  //       firstPart: 'map(',
  //       secondPart: ')',
  //       operator: (arg, scheduler) => map(arg),
  //       argumentsType: 'function',
  //       required: true,
  //     },
  //     value: []
  //   }, {
  //     id: 3,
  //     operator: {
  //       title: 'switchMap(...)',
  //       firstPart: 'switchMap(',
  //       secondPart: ')',
  //       operator: (scheduler) => map((x: any) => (x + 10)),
  //       argumentsType: 'observable',
  //       required: true,
  //     },
  //     value: []
  //   }
  // ];
  //
  // values: any[] = [
  //   {
  //     title: '5',
  //     value: 5
  //   },
  //   {
  //     title: '10',
  //     value: 10
  //   },
  //   {
  //     title: '(x) => x > 3',
  //     value: (x) => x > 3
  //   },
  //   {
  //     title: '(x) => x + 10',
  //     value: (x) => x + 10
  //   }
  // ];

  puzzle;

  source$ = new Subject();

  destination = (scheduler) => {
    return interval(10, scheduler).pipe(debounceTime(5, scheduler));
  }

  constructor(private puzzlesService: PuzzlesService, private router: Router,
              private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      if (params.id) {
        this.puzzle = puzzlesService.getConvertedByCode(params.id);
      } else {
        router.navigate(['/dashboard']).then();
      }
    });
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
      this.transferArg(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.source$.next(this.tree);
  }

  dropObservable(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length) {
        this.transferObservable();
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0);
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
      if (event.container.data.length) {
        this.transferArg(event.container.data, 0);
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0);
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

  dblClickSrcObservables(event, index) {
    this.transferSrcToDestObservable(index);

    this.source$.next(this.tree);
  }

  dblClickSrcOperators(event, index) {
    this.transferSrcToDestOperator(index);

    this.source$.next(this.tree);
  }

  dblClickSrcArgs(event, index) {
    event.stopPropagation();
    this.transferSrcToDestArg(index);
    this.source$.next(this.tree);
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
    this.transferArg(container, index);
    this.source$.next(this.tree);
  }

  transferObservable(nextIndex = this.puzzle.observables.length) {
    // for (let i = this.tree.operators.length - 1; i >= 0; i--) {
    //   this.transferOperator(this.tree.operators, i);
    // }
    transferArrayItem(this.tree.root,
      this.puzzle.observables,
      0,
      nextIndex);
  }

  transferOperator(container, index, nextIndex = this.puzzle.operators.length) {
    if (container[index].value.length) {
      for (let i = container[index].value.length - 1; i >= 0; i--) {
        this.transferArg(container[index].value, i);
      }
    }
    transferArrayItem(container,
      this.puzzle.operators,
      index,
      nextIndex);
  }

  transferArg(container, index, nextIndex = this.puzzle.args.length) {
    transferArrayItem(container,
      this.puzzle.args,
      index,
      nextIndex);
  }

  transferSrcToDestObservable(currentIndex) {
    if (this.tree.root.length) {
      this.transferObservable(this.puzzle.observables.length);
    }

    transferArrayItem(this.puzzle.observables,
      this.tree.root,
      currentIndex,
      0);
  }

  transferSrcToDestOperator(currentIndex) {
    if (this.tree.root.length) {
      transferArrayItem(this.puzzle.operators,
        this.tree.operators,
        currentIndex,
        this.tree.operators.length);
    }
  }

  transferSrcToDestArg(currentIndex) {
    let nextIndex = -1;
    this.tree.operators.forEach((operator, index) => {
      if (!operator.value.length && nextIndex === -1) {
        nextIndex = index;
      }
    });

    if (nextIndex !== -1) {
      transferArrayItem(this.puzzle.args,
        this.tree.operators[nextIndex].value,
        currentIndex,
        0);
    } else if (this.tree.operators.length) {
      nextIndex = this.tree.operators.length - 1;
      this.transferArg(this.tree.operators[nextIndex].value, 0);
      transferArrayItem(this.puzzle.args,
        this.tree.operators[nextIndex].value,
        currentIndex,
        0);
    }
  }
}
