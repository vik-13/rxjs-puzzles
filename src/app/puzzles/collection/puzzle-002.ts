import { interval } from 'rxjs';
import { Obs } from '../observables';
import { OPERATOR } from '../operators';
import { Expression } from '../expressions';

export const puzzle002 = {
  code: '002',
  observables: [
    new Obs((scheduler) => interval(10, scheduler), 'interval(10)'),
  ],
  operators: [
    OPERATOR.MAP
  ],
  expressions: [
    new Expression(x => x + 2, 'x => x + 2')
  ],
  pattern: [[10, 2], [20, 3], [30, 4], [40, 5], [50, 6], [60, 7], [70, 8], [80, 9], [90, 10], [100, 11]]
};
