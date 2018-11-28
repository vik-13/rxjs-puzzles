import { OPERATOR } from './operators';
import { interval, Observable, timer, VirtualTimeScheduler } from 'rxjs';

export interface ResultStreamType {
  value: number|boolean;
  time: number;
}

export interface ObservableType {
  title: string;
  func: (scheduler: VirtualTimeScheduler) => Observable<number|boolean>;
}

export interface ArgType {
  title: string;
  value: number|Function;
}

export interface Puzzle {
  code: string;
  title: string;
  description?: string;
  observables: ObservableType[];
  operators: any[];
  args: ArgType[];
  result: ResultStreamType[];
}

export const puzzles: Puzzle[] = [
  {
    code: '001',
    title: 'Map',
    description: 'Basic Map operator',
    observables: [{
      title: 'interval(10)',
      func: (scheduler) => interval(10, scheduler)
    }],
    operators: [
      OPERATOR.MAP
    ],
    args: [{
      title: 'x => x + 10',
      value: x => x + 10
    }],
    result: [{
      value: 10,
      time: 10
    }, {
      value: 11,
      time: 20
    }, {
      value: 12,
      time: 30
    }, {
      value: 13,
      time: 40
    }, {
      value: 14,
      time: 50
    }, {
      value: 15,
      time: 60
    }, {
      value: 16,
      time: 70
    }, {
      value: 17,
      time: 80
    }, {
      value: 18,
      time: 90
    }, {
      value: 19,
      time: 100
    }]
  }, {
    code: '002',
    title: 'Map',
    description: 'Basic Map operator',
    observables: [{
      title: 'timer(0, 10)',
      func: (scheduler) => timer(0, 10, scheduler)
    }, {
      title: 'interval(10)',
      func: (scheduler) => interval(10, scheduler)
    }],
    operators: [
      OPERATOR.DEBOUNCE_TIME,
      OPERATOR.MAP
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
    result: [{
      value: 0,
      time: 15
    }, {
      value: 1,
      time: 25
    }, {
      value: 2,
      time: 35
    }, {
      value: 3,
      time: 45
    }, {
      value: 4,
      time: 55
    }, {
      value: 5,
      time: 65
    }, {
      value: 6,
      time: 76
    }, {
      value: 7,
      time: 85
    }, {
      value: 8,
      time: 95
    }]
  }
];
