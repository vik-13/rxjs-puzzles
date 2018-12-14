import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
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
    operators: []
  };

  controlsIsOpen = false;

  puzzle;
  nextCode;

  source$ = new Subject();
  dialogInstance: MatDialogRef<SuccessDialogComponent>;

  constructor(private puzzlesService: PuzzlesService,
              private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef,
              private dialog: MatDialog) {
    route.params.subscribe((params) => {
      if (params.id) {
        this.controlsIsOpen = false;
        this.tree = {
          observable: [],
          operators: []
        };
        this.puzzle = puzzlesService.getPreparedByCode(params.id);
        this.nextCode = puzzlesService.getNextByCode(params.id);
        this.changeDetector.markForCheck();
        this.source$.next({
          valid: false
        });
      } else {
        router.navigate(['/dashboard']).then();
      }
    });
  }

  dropToObservablesSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferObservableToSrc(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }

    // TODO: Only if you drag form Observable
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

  dropToExpressionsSrc(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.transferExpressionToSrc(event.previousContainer.data, event.previousIndex, event.currentIndex);
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

  dropArgumentToDest(event: CdkDragDrop<any>) {
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
        this.transferExpressionToDest(event.container.data, event.previousIndex, 0, event.previousContainer.data);
      }
    }

    this.publishStream();
  }

  getAllIds() {
    const idsList = ['src-expressions', 'observable-list', 'dest-observable'];

    for (let i = 0; i < 32; i++) {
      idsList.push(`dest-argument-${i}`);
    }

    return idsList;
  }

  clickObservablesSrc(event, fromIndex) {
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

  clickOperatorsSrc(event, index) {
    event.stopPropagation();
    if (!this.tree.observable.length) {
      return false;
    }
    this.transferOperatorToDest(index);

    this.publishStream();
  }

  clickExpressionsSrc(event, fromIndex) {
    event.stopPropagation();
    let nextIndex = -1;
    this.tree.operators.forEach((operator, index) => {
      if (operator.argType && !operator.values.length && nextIndex === -1) {
        nextIndex = index;
      }
    });

    if (nextIndex !== -1 || (this.tree.operators.length && this.tree.operators[this.tree.operators.length - 1].argType)) {
      this.transferExpressionToDest(this.tree.operators[nextIndex !== -1 ? nextIndex : this.tree.operators.length - 1].values, fromIndex);
    }

    this.publishStream();
  }

  clickObservableDest(event, fromContainer, fromIndex) {
    event.stopPropagation();
    this.transferObservableToSrc(fromContainer, fromIndex);

    if (!this.tree.observable.length) {
      for (let i = this.tree.operators.length - 1; i >= 0; i--) {
        this.transferOperatorToSrc(i);
      }
    }

    this.publishStream();
  }

  clickDestOperator(event, container, fromIndex) {
    this.transferOperatorToSrc(fromIndex);

    this.publishStream();
  }

  clickDestExpression(event, fromContainer, fromIndex) {
    event.stopPropagation();
    this.transferExpressionToSrc(fromContainer, fromIndex);

    this.publishStream();
  }

  transferObservableToDest(toContainer, fromIndex, fromContainer = this.puzzle.observables) {
    if (toContainer.length) {
      for (let i = toContainer.length - 1; i >= 0; i--) {
        if (toContainer[i].type === ElementType.OBSERVABLE) {
          this.transferObservableToSrc(toContainer, i);
        } else {
          this.transferExpressionToSrc(toContainer, i);
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

  transferExpressionToDest(toContainer, fromIndex, toIndex = 0, fromContainer = this.puzzle.expressions) {
    if (toContainer.length) {
      for (let i = toContainer.length - 1; i >= 0; i--) {
        if (toContainer[i].type === ElementType.OBSERVABLE) {
          this.transferObservableToSrc(toContainer, i);
        } else {
          this.transferExpressionToSrc(toContainer, i);
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
          this.transferExpressionToSrc(this.tree.operators[fromIndex].values, i);
        }
      }
    }
    transferArrayItem(this.tree.operators,
      this.puzzle.operatorsCollection,
      fromIndex,
      toIndex);
  }

  transferExpressionToSrc(fromContainer, fromIndex, toIndex = this.puzzle.expressions.length) {
    transferArrayItem(fromContainer,
      this.puzzle.expressions,
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

  enterPredicateOnlyExpressions(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== ElementType.OBSERVABLE;
  }

  enterPredicateOnlyObservables(drag: CdkDrag, drop: CdkDropList) {
    return drag.data.type !== ElementType.EXPRESSION;
  }

  equality(isEqual) {
    if (isEqual) {
      this.controlsIsOpen = false;
      this.puzzlesService.setAsSolved(this.puzzle.code);
      // TODO: Cancel previous setTimeout to prevent opening dialog in case if user has changed stream already.
      setTimeout(() => {
        this.dialogInstance = this.dialog.open(SuccessDialogComponent, {data: {
          nextCode: this.nextCode
        }});
      }, 400);
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
