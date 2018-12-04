import { interval, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Arg } from '../arguments';
import { Obs } from '../observables';

export const puzzle3 = {
  code: '003',
  title: 'All',
  observables: [new Obs((scheduler) => timer(5, 10, scheduler), 'timer(5, 10)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)')
  ],
  operators: [
    OPERATOR.MAP,
    OPERATOR.DEBOUNCE_TIME
  ],
  args: [
    new Arg(5),
    new Arg((x) => x + 5, '(x) => x + 5')
  ],
  result: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
