import { Injectable } from '@angular/core';
import { Puzzle, puzzles } from './puzzles';
import { OperatorsCollection } from './operators';

@Injectable()
export class PuzzlesService {
  constructor() {}

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
}
