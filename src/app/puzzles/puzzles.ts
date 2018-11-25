import { Operators } from './operators';
import { interval, timer } from 'rxjs';

export interface Puzzle {
  code: string;
  title: string;
  description?: string;
  observables: { title: string, value: Function }[];
  operators: any[];
  args: { title: string, value: number|Function }[];
  result: any[];
}

export const puzzles: Puzzle[] = [
  {
    code: '001',
    title: 'Map',
    description: 'Basic Map operator',
    observables: [{
      title: 'timer(0, 10)',
      value: (scheduler) => timer(0, 10, scheduler)
    }, {
      title: 'interval(10)',
      value: (scheduler) => interval(10, scheduler)
    }],
    operators: [
      Operators.debounceTime,
      Operators.map
    ],
    args: [{
      title: '5',
      value: 5
    }, {
      title: '10',
      value: 10
    }, {
      title: 'x => x + 20',
      value: x => x + 20
    }, {
      title: 'x => x < 5',
      value: x => x < 5
    }],
    result: []
  }
];
