import { interval } from 'rxjs';
import { Obs } from '../observables';

export const puzzle001 = {
  code: '001',
  observables: [
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)')
  ],
  operators: [],
  expressions: [],
  pattern: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
