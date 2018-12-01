import { interval } from 'rxjs';

export const puzzle1 = {
  code: '001',
  title: 'Add Observable',
  observables: [{
    title: 'interval(10)',
    func: (scheduler) => interval(10, scheduler)
  }],
  operators: [],
  args: [],
  result: [[10, 0], [20, 1], [30, 2], [40, 3], [50, 4], [60, 5], [70, 6], [80, 7], [90, 8], [100, 9]]
};
