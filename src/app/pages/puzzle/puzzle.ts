import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { interval, Subject, timer } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { PuzzlesService } from '../../puzzles/puzzles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkValidity } from '../../puzzles/operators';
import { ElementType } from '../../puzzles/element-type';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog/success-dialog';

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

  controlsIsOpen = false;

  puzzle;

  source$ = new Subject();
  dialogInstance: MatDialogRef<SuccessDialogComponent>;

  constructor(private puzzlesService: PuzzlesService,
              private router: Router,
              private route: ActivatedRoute, private dialog: MatDialog) {
    route.params.subscribe((params) => {
      if (params.id) {
        this.puzzle = puzzlesService.getPreparedByCode(params.id);
      } else {
        router.navigate(['/dashboard']).then();
      }
    });
  }

  dropToObservablesSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferObservableToSrc(this.tree.observable, event.previousIndex, event.currentIndex);
    }

    if (!this.tree.observable.length) {
      for (let i = this.tree.operators.length - 1; i >= 0; i--) {
        this.transferOperatorToSrc(i);
      }
    }

    this.publishStream();
  }

  dropToOperatorsSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferOperatorToSrc(event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropToArgsSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferArgToSrc(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropObservableToDest(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferObservableToDest(event.container.data, event.previousIndex, event.previousContainer.data);
    }

    this.publishStream();
  }

  dropOperatorToDest(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferOperatorToDest(event.previousIndex, event.currentIndex);
    }

    this.publishStream();
  }

  dropArgToDest(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data[event.previousIndex].type === ElementType.OBSERVABLE) {
        this.transferObservableToDest(event.container.data, event.previousIndex, event.previousContainer.data);

        if (!this.tree.observable.length) {
          for (let i = this.tree.operators.length - 1; i >= 0; i--) {
            this.transferOperatorToSrc(i);
          }
        }
      } else {
        this.transferArgToDest(event.container.data, event.previousIndex, 0, event.previousContainer.data);
      }
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

  dblClickObservablesSrc(event, fromIndex) {
    if (!this.tree.observable.length || !this.tree.operators.length) {
      this.transferObservableToDest(this.tree.observable, fromIndex);
    } else {
      let nextIndex = -1;
      this.tree.operators.forEach((operator, index) => {
        if (operator.argType && !operator.values.length && nextIndex === -1) {
          nextIndex = index;
        }
      });

      if (nextIndex !== -1 || (this.tree.operators.length && this.tree.operators[this.tree.operators.length - 1].argType)) {
        this.transferObservableToDest(this.tree.operators[nextIndex !== -1 ? nextIndex : this.tree.operators.length - 1].values, fromIndex);
      }
    }

    this.publishStream();
  }

  dblClickOperatorsSrc(event, index) {
    event.stopPropagation();
    this.transferOperatorToDest(index);

    this.publishStream();
  }

  dblClickArgsSrc(event, fromIndex) {
    event.stopPropagation();
    let nextIndex = -1;
    this.tree.operators.forEach((operator, index) => {
      if (operator.argType && !operator.values.length && nextIndex === -1) {
        nextIndex = index;
      }
    });

    if (nextIndex !== -1 || (this.tree.operators.length && this.tree.operators[this.tree.operators.length - 1].argType)) {
      this.transferArgToDest(this.tree.operators[nextIndex !== -1 ? nextIndex : this.tree.operators.length - 1].values, fromIndex);
    }

    this.publishStream();
  }

  dblClickObservableDest(event, fromContainer, fromIndex) {
    event.stopPropagation();
    this.transferObservableToSrc(fromContainer, fromIndex);

    if (!this.tree.observable.length) {
      for (let i = this.tree.operators.length - 1; i >= 0; i--) {
        this.transferOperatorToSrc(i);
      }
    }

    this.publishStream();
  }

  dblClickDestOperator(event, container, fromIndex) {
    this.transferOperatorToSrc(fromIndex);

    this.publishStream();
  }

  dblClickDestArg(event, fromContainer, fromIndex) {
    event.stopPropagation();
    this.transferArgToSrc(fromContainer, fromIndex);

    this.publishStream();
  }

  transferObservableToDest(toContainer, fromIndex, fromContainer = this.puzzle.observables) {
    if (toContainer.length) {
      for (let i = toContainer.length - 1; i >= 0; i--) {
        if (toContainer[i].type === ElementType.OBSERVABLE) {
          this.transferObservableToSrc(toContainer, i);
        } else {
          this.transferArgToSrc(toContainer, i);
        }
      }
    }
    transferArrayItem(fromContainer,
      toContainer,
      fromIndex,
      0);
  }

  transferOperatorToDest(fromIndex, toIndex = this.tree.operators.length) {
    transferArrayItem(this.puzzle.operatorsCollection,
      this.tree.operators,
      fromIndex,
      toIndex);
  }

  transferArgToDest(toContainer, fromIndex, toIndex = 0, fromContainer = this.puzzle.args) {
    if (toContainer.length) {
      for (let i = toContainer.length - 1; i >= 0; i--) {
        if (toContainer[i].type === ElementType.OBSERVABLE) {
          this.transferObservableToSrc(toContainer, i);
        } else {
          this.transferArgToSrc(toContainer, i);
        }
      }
    }

    transferArrayItem(fromContainer,
      toContainer,
      fromIndex,
      toIndex);
  }

  transferObservableToSrc(fromContainer, fromIndex, toIndex = this.puzzle.observables.length) {
    transferArrayItem(fromContainer,
      this.puzzle.observables,
      fromIndex,
      toIndex);
  }

  transferOperatorToSrc(fromIndex, toIndex = this.puzzle.operatorsCollection.length) {
    if (this.tree.operators[fromIndex].values.length) {
      for (let i = this.tree.operators[fromIndex].values.length - 1; i >= 0; i--) {
        if (this.tree.operators[fromIndex].values[i].type === ElementType.OBSERVABLE) {
          this.transferObservableToSrc(this.tree.operators[fromIndex].values, i);
        } else {
          this.transferArgToSrc(this.tree.operators[fromIndex].values, i);
        }
      }
    }
    transferArrayItem(this.tree.operators,
      this.puzzle.operatorsCollection,
      fromIndex,
      toIndex);
  }

  transferArgToSrc(fromContainer, fromIndex, toIndex = this.puzzle.args.length) {
    transferArrayItem(fromContainer,
      this.puzzle.args,
      fromIndex,
      toIndex);
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

  enterPredicateOnlyArguments(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== ElementType.OBSERVABLE;
  }

  enterPredicateOnlyObservables(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== ElementType.ARGUMENT;
  }

  equality(isEqual) {
    if (isEqual) {
      // TODO: Cancel previous setTimeout to prevent opening dialog in case if user has changed stream already.
      setTimeout(() => {
        this.dialogInstance = this.dialog.open(SuccessDialogComponent);
      }, 1000);
    } else {
      this.dialogInstance.close();
      this.dialogInstance = null;
    }
  }

  openControls(event) {
    this.controlsIsOpen = true;
  }

  closeControls(event) {
    this.controlsIsOpen = false;
  }

  startDragging() {
    this.controlsIsOpen = false;
  }
}
