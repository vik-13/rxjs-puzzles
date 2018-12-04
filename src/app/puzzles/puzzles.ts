import { Observable, VirtualTimeScheduler } from 'rxjs';
import { puzzle1 } from './collection/puzzle-1';
import { puzzle2 } from './collection/puzzle-2';
import { puzzle3 } from './collection/puzzle-3';
import { puzzle4 } from './collection/puzzle-4';

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
  observables: ObservableType[];
  operators: any[];
  args: ArgType[];
  result: number[][];
}

export const puzzles: Puzzle[] = [
  puzzle1,
  puzzle2,
  puzzle3,
  puzzle4
];
