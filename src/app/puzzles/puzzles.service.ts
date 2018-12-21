import { Injectable } from '@angular/core';
import { Puzzle, puzzles } from './puzzles';
import { OperatorsCollection } from './operators';
import { Subject, Timestamp, VirtualTimeScheduler } from 'rxjs';
import { ElementType } from './element-type';
import { map, observeOn, reduce, takeUntil, timestamp } from 'rxjs/operators';

const LOCAL_STORAGE_KEY = 'rxjs-puzzles-solved';

@Injectable()
export class PuzzlesService {
  solved: string[] = [];

  constructor() {
    const solved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (solved) {
      this.solved = JSON.parse(solved);
    }

    this.validate();
  }

  prepare(puzzle: Puzzle) {
    return {
      ...puzzle,
      observables: [
        ...puzzle.observables
      ],
      expressions: [
        ...puzzle.expressions
      ],
      operatorsCollection: puzzle.operators.map((operatorType, index) => {
        const operator = {...OperatorsCollection[operatorType]};
        const title = operator.title.split('{{argument}}');
        return {
          id: index,
          title: operator.title.replace('{{argument}}', '...'),
          left: title[0],
          right: title.length > 1 ? title[1] : '',
          func: operator.func,
          argType: operator.argType,
          argRequired: operator.argRequired,
          values: []
        };
      }),
      pattern: [...puzzle.pattern.map((item) => ({...item}))]
    };
  }

  getPreparedByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? this.prepare(puzzle[0]) : null;
  }

  getNextByCode(code: string) {
    let next = null;
    puzzles.forEach((item, index) => {
      if (item.code === code && index + 1 !== puzzles.length) {
        next = puzzles[index + 1].code;
      }
    });

    return next;
  }

  getByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? puzzle[0] : false;
  }

  getAll() {
    return puzzles;
  }

  setAsSolved(code: string) {
    this.solved = [...this.solved, code].filter((value, index, self) => self.indexOf(value) === index);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.solved));
  }

  isSolved(code: string) {
    return typeof this.solved.find((item) => item === code) !== 'undefined';
  }

  getSolved() {
    return this.solved;
  }

  validate() {
    puzzles.forEach((sourcePuzzle) => {
      let solutionsCount = 0;
      const puzzle = this.prepare(sourcePuzzle);
      let tree;
      puzzle.observables.forEach((observable) => {
        tree = {
          observable: [observable],
          operators: []
        };

        if (this.checkEquality(tree, puzzle.pattern)) {
          solutionsCount++;
        }
      });
      console.log(`Code: ${puzzle.code}, Possible solutions: ${solutionsCount}`);
    });
  }

  checkEquality(tree, sourcePattern) {
    let isEqual = false;
    const stop$ = new Subject();
    const scheduler = new VirtualTimeScheduler(undefined, 100);

    tree.observable[0].func(scheduler)
      .pipe(...tree.operators.map((item) => {
        return !item.values.length ? item.func() : item.func(item.values[0].type === ElementType.OBSERVABLE ?
          item.values[0].func(scheduler) :
          item.values[0].value, scheduler);
      }))
      .pipe(observeOn(scheduler))
      .pipe(timestamp(scheduler))
      .pipe(map((data: Timestamp<any>) => ({value: data.value, time: data.timestamp})))
      .pipe(takeUntil(stop$))
      .pipe(reduce((a: any, b: any) => {
        return a.concat(b);
      }, []))
      .pipe(map((list: any[]) => {
        return list.map((item) => {
          if (typeof item.value === 'boolean' ) {
            item.value = item.value ? 'T' : 'F';
          }
          return item;
        });
      }))
      .subscribe((list) => {
        const pattern = sourcePattern.map((item) => ({time: item[0], value: item[1]}));
        isEqual = true;
        if (list.length === pattern.length) {
          list.forEach((item, index) => {
            if (item.value !== pattern[index].value || item.time !== pattern[index].time) {
              isEqual = false;
            }
          });
        } else {
          isEqual = false;
        }
      });

    scheduler.flush();
    stop$.next();
    return isEqual;
  }
}
