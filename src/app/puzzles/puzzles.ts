import { Observable, VirtualTimeScheduler } from 'rxjs';
import { puzzle001 } from './collection/puzzle-001';
import { puzzle002 } from './collection/puzzle-002';
import { puzzle003 } from './collection/puzzle-003';
import { puzzle004 } from './collection/puzzle-004';

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
  observables: ObservableType[];
  operators: any[];
  args: ArgType[];
  pattern: number[][];
}

export const puzzles: Puzzle[] = [
  puzzle001,
  puzzle002,
  puzzle003,
  puzzle004
];
