import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject, timer } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { PuzzlesService } from '../../puzzles/puzzles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkValidity } from '../../puzzles/operators';
import { TYPE } from '../../puzzles/types';

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

  dropObservableToSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferDestToSrcObservable(event.currentIndex);
    }

    this.publishStream();
  }

  dropOperatorToSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferDestToSrcOperator(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropArgToSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferDestToSrcArg(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropObservableToDest(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length) {
        this.transferDestToSrcObservable(undefined, false);
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0);
    }

    this.publishStream();
  }

  dropOperatorToDest(event: CdkDragDrop<any>) {
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

  dropArgToDest(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length) {
        this.transferDestToSrcArg(event.container.data, 0);
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

  dblClickDestObservable(event) {
    this.transferDestToSrcObservable();

    this.publishStream();
  }

  dblClickDestOperator(event, container, index) {
    this.transferDestToSrcOperator(container, index);

    this.publishStream();
  }

  dblClickDestArg(event, container, index) {
    event.stopPropagation();
    this.transferDestToSrcArg(container, index);
    this.publishStream();
  }

  transferDestToSrcObservable(nextIndex = this.puzzle.observables.length, transferOperators = true) {
    if (transferOperators) {
      for (let i = this.tree.operators.length - 1; i >= 0; i--) {
        this.transferDestToSrcOperator(this.tree.operators, i);
      }
    }
    transferArrayItem(this.tree.observable,
      this.puzzle.observables,
      0,
      nextIndex);
  }

  transferDestToSrcOperator(container, index, nextIndex = this.puzzle.operatorsCollection.length) {
    if (container[index].values.length) {
      for (let i = container[index].values.length - 1; i >= 0; i--) {
        if (container[index].values[i].type === TYPE.OBSERVABLE) {
          transferArrayItem(container[index].values,
            this.puzzle.observables,
            i,
            this.puzzle.observables.length);
        } else {
          this.transferDestToSrcArg(container[index].values, i);
        }
      }
    }
    transferArrayItem(container,
      this.puzzle.operatorsCollection,
      index,
      nextIndex);
  }

  transferDestToSrcArg(container, index, nextIndex = this.puzzle.args.length) {
    transferArrayItem(container,
      this.puzzle.args,
      index,
      nextIndex);
  }

  transferSrcToDestObservable(currentIndex) {
    if (this.tree.observable.length) {
      this.transferDestToSrcObservable(this.puzzle.observables.length, false);
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
      this.transferDestToSrcArg(this.tree.operators[nextIndex].values, 0);
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
    return drag.data.type !== TYPE.OBSERVABLE;
  }

  enterPredicateSrcObservables(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== TYPE.ARGUMENT;
  }
}
