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
      args: [
        ...puzzle.args
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
      result: [...puzzle.result.map((item) => ({...item}))]
    };
  }

  getPreparedByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? this.prepare(puzzle[0]) : null;
  }

  getByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? puzzle[0] : false;
  }

  getAll() {
    return puzzles;
  }
}
