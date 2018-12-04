import { TYPE } from './types';

export enum ARGUMENT_TYPE {
  NUMBER = 'number',
  FUNCTION = 'function',
  OBSERVABLE = 'observable'
}

export class Arg {
  type: TYPE = TYPE.ARGUMENT;

  constructor(public value: number|Function, public title?: string) {
    if (typeof this.title === 'undefined') {
      this.title = value.toString();
    }
  }
}
