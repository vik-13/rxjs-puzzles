import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject, timer } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { PuzzlesService } from '../../puzzles/puzzles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkValidity } from '../../puzzles/operators';

@Component({
  selector: 'rxp-puzzle',
  templateUrl: 'puzzle.html',
  styleUrls: ['puzzle.scss']
})
export class PuzzleComponent {
  tree = {
    observable: [],
    operators: [],
  };

  puzzle;

  source$ = new Subject();

  constructor(private puzzlesService: PuzzlesService, private router: Router,
              private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      if (params.id) {
        this.puzzle = puzzlesService.getPreparedByCode(params.id);
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

    this.publishStream();
  }

  dropOperatorBack(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferOperator(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropArgBack(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferArg(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.publishStream();
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

    this.publishStream();
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

    this.publishStream();
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

    this.publishStream();
  }

  getAllIds() {
    const idsList = ['src-arguments', 'observable-list', 'dest-observable'];

    for (let i = 0; i < 32; i++) {
      idsList.push(`dest-argument-${i}`);
    }

    return idsList;
  }

  getIds(index = -1) {
    const idsList = [];
    // if (index !== -1) {
      idsList.push('src-arguments');
    // }
    for (let i = 0; i < 32; i++) {
      // if (index !== i) {
        idsList.push(`dest-argument-${i}`);
      // }
    }
    return idsList;
  }

  dblClickSrcObservables(event, index) {
    this.transferSrcToDestObservable(index);

    this.publishStream();
  }

  dblClickSrcOperators(event, index) {
    this.transferSrcToDestOperator(index);

    this.publishStream();
  }

  dblClickSrcArgs(event, index) {
    event.stopPropagation();
    this.transferSrcToDestArg(index);
    this.publishStream();
  }

  dblClickObservable(event) {
    this.transferObservable();

    this.publishStream();
  }

  dblClickOperator(event, container, index) {
    this.transferOperator(container, index);

    this.publishStream();
  }

  dblClickArg(event, container, index) {
    event.stopPropagation();
    this.transferArg(container, index);
    this.publishStream();
  }

  transferObservable(nextIndex = this.puzzle.observables.length) {
    for (let i = this.tree.operators.length - 1; i >= 0; i--) {
      this.transferOperator(this.tree.operators, i);
    }
    transferArrayItem(this.tree.observable,
      this.puzzle.observables,
      0,
      nextIndex);
  }

  transferOperator(container, index, nextIndex = this.puzzle.operatorsCollection.length) {
    if (container[index].values.length) {
      for (let i = container[index].values.length - 1; i >= 0; i--) {
        this.transferArg(container[index].values, i);
      }
    }
    transferArrayItem(container,
      this.puzzle.operatorsCollection,
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
    if (this.tree.observable.length) {
      this.transferObservable(this.puzzle.observables.length);
    }

    transferArrayItem(this.puzzle.observables,
      this.tree.observable,
      currentIndex,
      0);
  }

  transferSrcToDestOperator(currentIndex) {
    if (this.tree.observable.length) {
      transferArrayItem(this.puzzle.operatorsCollection,
        this.tree.operators,
        currentIndex,
        this.tree.operators.length);
    }
  }

  transferSrcToDestArg(currentIndex) {
    let nextIndex = -1;
    this.tree.operators.forEach((operator, index) => {
      if (!operator.values.length && nextIndex === -1) {
        nextIndex = index;
      }
    });

    if (nextIndex !== -1) {
      transferArrayItem(this.puzzle.args,
        this.tree.operators[nextIndex].values,
        currentIndex,
        0);
    } else if (this.tree.operators.length) {
      nextIndex = this.tree.operators.length - 1;
      this.transferArg(this.tree.operators[nextIndex].values, 0);
      transferArrayItem(this.puzzle.args,
        this.tree.operators[nextIndex].values,
        currentIndex,
        0);
    }
  }

  publishStream() {
    if (!this.tree.observable.length) {
      this.source$.next({
        valid: false
      });
    } else {
      let isValid = true;
      this.tree.operators.forEach((operatorContainer) => {
        const validity = checkValidity(operatorContainer);
        if (!validity.valid) {
          isValid = false;
        }
      });

      if (isValid) {
        this.source$.next({
          valid: true,
          data: this.tree
        });
      } else {
        this.source$.next({
          valid: false
        });
      }
    }
  }

  enterPredicateSrcArguments(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== 'observable';
  }

  enterPredicateSrcObservables(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== 'argument';
  }
}
