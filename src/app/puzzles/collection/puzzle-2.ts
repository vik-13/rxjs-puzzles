import { interval, of, timer } from 'rxjs';

export const puzzle2 = {
  code: '002',
  title: 'Choose right',
  observables: [{
      title: 'timer(0, 10)',
      func: (scheduler) => timer(0, 10, scheduler)
  }, {
    title: 'interval(10)',
    func: (scheduler) => interval(10, scheduler)
  }, {
      title: 'of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)',
      func: (scheduler) => of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, scheduler)
  }],
  operators: [],
  args: [],
  result: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
