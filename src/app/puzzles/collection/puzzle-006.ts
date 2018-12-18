import { interval, of, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Obs } from '../observables';
import { Expression } from '../expressions';

export const puzzle006 = {
  code: '006',
  observables: [
    new Obs((scheduler) => timer(0, 5, scheduler), 'timer(0, 5)'),
    new Obs((scheduler) => timer( 35, scheduler), 'timer(35)'),
    new Obs((scheduler) => interval(5, scheduler), 'interval(5)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
    new Obs((scheduler) => timer(10, 5, scheduler), 'timer(10, 5)')
  ],
  operators: [
    OPERATOR.DISTINCT_UNTIL_CHANGED,
    OPERATOR.FILTER,
    OPERATOR.THROTTLE,
    OPERATOR.SWITCH_MAP
  ],
  expressions: [
    new Expression(5),
    new Expression((x) => x + 5, '(x) => x + 5'),
    new Expression((x) => x < 5, '(x) => x < 5')
  ],
  pattern: [[15, 0], [20, 1], [25, 2], [30, 3], [35, 4], [55, 0], [60, 1], [65, 2], [70, 3], [75, 4], [95, 0], [100, 1]]
};
