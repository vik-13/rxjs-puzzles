import { interval, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Arg } from '../arguments';
import { Obs } from '../observables';

export const puzzle003 = {
  code: '003',
  observables: [
    new Obs((scheduler) => timer(5, 10, scheduler), 'timer(5, 10)'),
    new Obs((scheduler) => interval(5, scheduler), 'interval(5)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
    new Obs((scheduler) => interval(15, scheduler), 'interval(15)')
  ],
  operators: [
    OPERATOR.MAP,
    OPERATOR.DEBOUNCE_TIME,
    OPERATOR.MERGE_MAP,
    OPERATOR.CONCAT_MAP,
    OPERATOR.SWITCH_MAP
  ],
  args: [
    new Arg(5),
    new Arg((x) => x + 5, '(x) => x + 5')
  ],
  pattern: [[25, 0], [30, 1], [40, 0], [45, 1], [55, 0], [60, 1], [70, 0], [75, 1], [85, 0], [90, 1], [100, 0]]
};
