import { interval } from 'rxjs';
import { Obs } from '../observables';

export const puzzle1 = {
  code: '001',
  title: 'Add Observable',
  observables: [
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)')
  ],
  operators: [],
  args: [],
  result: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
