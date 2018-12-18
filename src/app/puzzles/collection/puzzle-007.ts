import { interval, of, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Obs } from '../observables';
import { Expression } from '../expressions';

export const puzzle007 = {
  code: '007',
  observables: [
    new Obs((scheduler) => timer(0, 15, scheduler), 'timer(0, 15)'),
    new Obs((scheduler) => timer( 35, scheduler), 'timer(35)'),
    new Obs((scheduler) => interval(5, scheduler), 'interval(5)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
    new Obs((scheduler) => timer(10, 25, scheduler), 'timer(10, 25)')
  ],
  operators: [
    OPERATOR.DISTINCT_UNTIL_CHANGED,
    OPERATOR.FILTER,
    OPERATOR.THROTTLE,
    OPERATOR.SWITCH_MAP,
    OPERATOR.SWITCH_MAP,
    OPERATOR.MERGE_MAP
  ],
  expressions: [
    new Expression(5),
    new Expression((x) => x + 5, '(x) => x + 5'),
    new Expression((x) => x < 5, '(x) => x < 5')
  ],
  pattern: [[35, 0], [45, 1], [80, 0], [90, 1]]
};
