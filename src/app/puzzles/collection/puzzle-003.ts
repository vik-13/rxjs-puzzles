import { interval, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Obs } from '../observables';
import { Expression } from '../expressions';

export const puzzle003 = {
  code: '003',
  observables: [
    new Obs((scheduler) => timer(0, 10, scheduler), 'timer(0, 10)'),
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
    new Obs((scheduler) => interval(20, scheduler), 'interval(20)')
  ],
  operators: [
    OPERATOR.MAP,
    OPERATOR.DEBOUNCE_TIME,
    OPERATOR.SAMPLE
  ],
  expressions: [
    new Expression(5),
    new Expression((x) => x + 5, '(x) => x + 5')
  ],
  pattern: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
