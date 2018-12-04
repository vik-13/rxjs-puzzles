import { Observable, VirtualTimeScheduler } from 'rxjs';
import { TYPE } from './types';

export class Obs {
  type: TYPE = TYPE.OBSERVABLE;

  constructor(public func: (scheduler: VirtualTimeScheduler) => Observable<number|boolean>, public title: string) {}
}
