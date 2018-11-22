import { Sources } from './sources';
import { Operators } from './operators';

export interface Puzzle {
  title: string;
  description?: string;
  sources: any[];
  operators: any[];
  functions: any[];
  result: any[];
}

export interface Puzzles {
  [id: string]: Puzzle;
}

export const puzzles: Puzzles = {
  '0': {
    title: 'Map',
    description: 'Basic Map operator',
    sources: [Sources.of, Sources.interval],
    operators: [Operators.map, Operators.filter],
    functions: ['(a) => a * 10'],
    result: []
  }
};
