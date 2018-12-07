import { Observable, VirtualTimeScheduler } from 'rxjs';
import { ElementType } from './element-type';

export class Obs {
  type: ElementType = ElementType.OBSERVABLE;

  constructor(public func: (scheduler: VirtualTimeScheduler) => Observable<number|boolean>, public title: string) {}
}
