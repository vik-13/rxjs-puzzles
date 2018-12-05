import {
  auditTime,
  concatMap, debounce,
  debounceTime, delay, distinctUntilChanged,
  filter, first,
  map, merge, mergeMap,
  sample, single,
  skip,
  skipUntil,
  skipWhile, switchMap,
  take,
  takeUntil,
  takeWhile, throttle, throttleTime
} from 'rxjs/operators';
import { ARGUMENT_TYPE } from './arguments';
import { TYPE } from './types';

export enum OPERATOR {
  DEBOUNCE,
  DEBOUNCE_TIME,
  MAP,
  FILTER,
  AUDIT_TIME,
  SAMPLE,
  SKIP,
  SKIP_UNTIL,
  SKIP_WHILE,
  TAKE,
  TAKE_UNTIL,
  TAKE_WHILE,
  FIRST,
  DISTINCT_UNTIL_CHANGED,
  SINGLE,
  THROTTLE,
  THROTTLE_TIME,

  CONCAT_MAP,
  MERGE_MAP,
  SWITCH_MAP,

  DELAY,

  MERGE
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
  [OPERATOR.DEBOUNCE]: {
    title: 'debounce(x => {{argument}})',
    func: (arg, scheduler) => debounce(x => arg),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
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
  [OPERATOR.SAMPLE]: {
    title: 'sample({{argument}})',
    func: (arg, scheduler) => sample(arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.SKIP]: {
    title: 'skip({{argument}})',
    func: (arg, scheduler) => skip(arg),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.SKIP_UNTIL]: {
    title: 'skipUntil({{argument}})',
    func: (arg, scheduler) => skipUntil(arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.SKIP_WHILE]: {
    title: 'skipWhile({{argument}})',
    func: (arg, scheduler) => skipWhile(arg),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: true
  },
  [OPERATOR.TAKE]: {
    title: 'take({{argument}})',
    func: (arg, scheduler) => take(arg),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.TAKE_UNTIL]: {
    title: 'skipUntil({{argument}})',
    func: (arg, scheduler) => takeUntil(arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.TAKE_WHILE]: {
    title: 'skipWhile({{argument}})',
    func: (arg, scheduler) => takeWhile(arg),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: true
  },
  [OPERATOR.FIRST]: {
    title: 'first({{argument}})',
    func: (arg, scheduler) => arg ? first(arg) : first(),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: false
  },
  [OPERATOR.DISTINCT_UNTIL_CHANGED]: {
    title: 'distinctUntilChanged()',
    func: (arg, scheduler) => distinctUntilChanged(),
    argType: null,
    argRequired: false
  },
  [OPERATOR.SINGLE]: {
    title: 'single({{argument}})',
    func: (arg, scheduler) => single(arg),
    argType: ARGUMENT_TYPE.FUNCTION,
    argRequired: true
  },
  [OPERATOR.THROTTLE]: {
    title: 'throttle({{argument}})',
    func: (arg, scheduler) => throttle(x => arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.THROTTLE_TIME]: {
    title: 'throttleTime({{argument}})',
    func: (arg, scheduler) => throttleTime(arg),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.CONCAT_MAP]: {
    title: 'concatMap(x => {{argument}})',
    func: (arg, scheduler) => concatMap(x => arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.MERGE_MAP]: {
    title: 'mergeMap(x => {{argument}})',
    func: (arg, scheduler) => mergeMap(x => arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.SWITCH_MAP]: {
    title: 'switchMap(x => {{argument}})',
    func: (arg, scheduler) => switchMap(x => arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  },
  [OPERATOR.DELAY]: {
    title: 'delay({{argument}})',
    func: (arg, scheduler) => delay(arg, scheduler),
    argType: ARGUMENT_TYPE.NUMBER,
    argRequired: true
  },
  [OPERATOR.MERGE]: {
    title: 'merge({{argument}})',
    func: (arg, scheduler) => merge(arg),
    argType: ARGUMENT_TYPE.OBSERVABLE,
    argRequired: true
  }
};

