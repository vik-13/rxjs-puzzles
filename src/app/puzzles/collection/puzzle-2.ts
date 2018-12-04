import { interval, of, timer } from 'rxjs';
import { Obs } from '../observables';

export const puzzle2 = {
  code: '002',
  title: 'Choose right',
  observables: [
    new Obs((scheduler) => timer(0, 10, scheduler), 'timer(0, 10)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
    new Obs((scheduler) => of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, scheduler), 'of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)')
  ],
  operators: [],
  args: [],
  result: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
