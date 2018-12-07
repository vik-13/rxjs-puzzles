import { ElementType } from './element-type';

export class Arg {
  type: ElementType = ElementType.ARGUMENT;

  constructor(public value: number|Function, public title?: string) {
    if (typeof this.title === 'undefined') {
      this.title = value.toString();
    }
  }
}
