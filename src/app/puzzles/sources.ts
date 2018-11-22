import { interval, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

export const Sources = {
  of: {
    title: 'Of',
    func: of
  },
  interval: {
    title: 'Interval',
    func: interval
  },
  timeout: {
    title: 'Timeout',
    func: timeout
  }
};
