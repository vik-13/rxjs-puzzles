import {
  auditTime,
  concatMap,
  debounceTime,
  filter,
  map, mergeMap,
  sample,
  skip,
  skipUntil,
  skipWhile, switchMap,
  take,
  takeUntil,
  takeWhile
} from 'rxjs/operators';
import { ARGUMENT_TYPE } from './arguments';
import { OperatorFunction } from 'rxjs';
import { TYPE } from './types';

export enum OPERATOR {
  DEBOUNCE_TIME,
  MAP,
  FILTER,
  AUDIT_TIME,
  SKIP,
  SAMPLE
}

// TODO: Too complex validation. Should be simplified.
export const checkValidity = (operator) => {
  const validityObject = {
    valid: false,
    required: false,
    notCompatible: false
  };

  if (!operator.values.length && operator.argRequired) {
    validityObject.required = true;
    return validityObject;
  } else if (!operator.values.length) {
    validityObject.valid = true;
    return validityObject;
  }

  if (operator.values[0].type === TYPE.OBSERVABLE) {
    if (operator.argType === ARGUMENT_TYPE.OBSERVABLE) {
      validityObject.valid = true;
    } else {
      validityObject.notCompatible = true;
    }
  } else {
    if (typeof operator.values[0].value === operator.argType) {
      validityObject.valid = true;
    } else {
      validityObject.notCompatible = true;
    }
  }
  return validityObject;
};

export const OperatorsCollection = {
  [OPERATOR.DEBOUNCE_TIME]: {
    title: 'debounceTime({{argument}})',
    func: (arg, scheduler) => debounceTime(arg, scheduler),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.MAP]: {
    title: 'map({{argument}})',
    func: (arg, scheduler) => map(arg),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: true
  },
  [OPERATOR.FILTER]: {
    title: 'filter({{argument}})',
    func: (arg, scheduler) => filter(arg),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: true
  },
  [OPERATOR.AUDIT_TIME]: {
    title: 'auditTime({{argument}})',
    func: (arg, scheduler) => auditTime(arg, scheduler),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.SKIP]: {
    title: 'skip({{argument}})',
    func: (arg, scheduler) => skip(arg),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.SAMPLE]: {
    title: 'sample({{argument}})',
    func: (arg, scheduler) => sample(arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
};

// export const Operators = {
//   debounceTime: {
//     title: 'debounceTime({{argument}})',
//     operator: (arg, scheduler) => debounceTime(arg, scheduler),
//     argumentType: ARGUMENT_TYPE.NUMBER
//   },
//   map: {
//     title: 'map({{argument}})',
//     operator: (arg, scheduler) => map(arg),
//     argumentType: ARGUMENT_TYPE.FUNCTION
//   },
//   filter: {
//     title: 'filter({{argument}})',
//     operator: (arg, scheduler) => filter(arg),
//     argumentType: ARGUMENT_TYPE.FUNCTION
//   },
//   auditTime: {
//     title: 'auditTime({{argument}})',
//     operator: (arg, scheduler) => auditTime(arg, scheduler),
//     argumentType: ARGUMENT_TYPE.NUMBER
//   },
//   sample: {
//     title: 'sample({{argument}})',
//     operator: (arg, scheduler) => sample(arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
//   skip: {
//     title: 'skip({{argument}})',
//     operator: (arg, scheduler) => skip(arg),
//     argumentType: ARGUMENT_TYPE.NUMBER
//   },
//   skipUntil: {
//     title: 'skipUntil({{argument}})',
//     operator: (arg, scheduler) => skipUntil(arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
//   skipWhile: {
//     title: 'skipWhile({{argument}})',
//     operator: (arg, scheduler) => skipWhile(arg),
//     argumentType: ARGUMENT_TYPE.FUNCTION
//   },
//   take: {
//     title: 'take({{argument}})',
//     operator: (arg, scheduler) => take(arg),
//     argumentType: ARGUMENT_TYPE.NUMBER
//   },
//   takeUntil: {
//     title: 'takeUntil({{argument}})',
//     operator: (arg, scheduler) => takeUntil(arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
//   takeWhile: {
//     title: 'takeWhile({{argument}})',
//     operator: (arg, scheduler) => takeWhile(arg),
//     argumentType: ARGUMENT_TYPE.FUNCTION
//   },
//   concatMap: {
//     title: 'concatMap(x => {{argument}})',
//     operator: (arg, scheduler) => concatMap(x => arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
//   mergeMap: {
//     title: 'mergeMap(x => {{argument}})',
//     operator: (arg, scheduler) => mergeMap(x => arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
//   switchMap: {
//     title: 'switchMap(x => {{argument}})',
//     operator: (arg, scheduler) => switchMap(x => arg),
//     argumentType: ARGUMENT_TYPE.OBSERVABLE
//   },
// };
