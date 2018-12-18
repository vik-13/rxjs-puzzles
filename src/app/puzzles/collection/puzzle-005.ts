import { interval, of, timer } from 'rxjs';
import { OPERATOR } from '../operators';
import { Obs } from '../observables';
import { Expression } from '../expressions';

export const puzzle005 = {
  code: '005',
  observables: [
    new Obs((scheduler) => timer(0, 5, scheduler), 'timer(0, 5)'),
    new Obs((scheduler) => timer( 35, scheduler), 'timer(35)'),
    new Obs((scheduler) => timer(10, 5, scheduler), 'timer(10, 5)')
  ],
  operators: [
    OPERATOR.MAP,
    OPERATOR.DEBOUNCE_TIME,
    OPERATOR.SWITCH_MAP,
    OPERATOR.CONCAT_MAP,
    OPERATOR.SKIP_WHILE,
    OPERATOR.SKIP_UNTIL,
    OPERATOR.DEBOUNCE
  ],
  expressions: [
    new Expression(5),
    new Expression((x) => x + 5, '(x) => x + 5'),
    new Expression((x) => x < 5, '(x) => x < 5')
  ],
  pattern: [[70, 5], [75, 6], [80, 7], [85, 8], [90, 9], [95, 10], [100, 11]]
};
