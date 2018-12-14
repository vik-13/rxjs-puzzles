import { ElementType } from './element-type';

export class Expression {
  type: ElementType = ElementType.EXPRESSION;

  constructor(public value: number|Function, public title?: string) {
    if (typeof this.title === 'undefined') {
      this.title = value.toString();
    }
  }
}
