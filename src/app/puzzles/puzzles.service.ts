import { Injectable } from '@angular/core';
import { Puzzle, puzzles } from './puzzles';

@Injectable()
export class PuzzlesService {
  constructor() {}

  convert(puzzle: Puzzle) {
    return {
      ...puzzle,
      observables: [
        ...puzzle.observables
      ],
      args: [
        ...puzzle.args
      ],
      operators: puzzle.operators.map((operator, index) => {
        const title = operator.title.split('{{argument}}');
        return {
          id: index,
          operator: {
            title: operator.title.replace('{{argument}}', '...'),
            left: title[0],
            right: title.length > 1 ? title[1] : '',
            operator: operator.operator,
            argumentType: operator.argumentType
          },
          value: []
        };
      })
    };
  }

  getConvertedByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? this.convert(puzzle[0]) : null;
  }

  getByCode(code: string) {
    const puzzle = puzzles.filter((item) => item.code === code);
    return puzzle.length ? puzzle[0] : false;
  }

  getAll() {
    return puzzles;
  }
}
