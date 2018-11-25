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
import { ARGUMENT_TYPE } from './argument-type';

export const Operators = {
  debounceTime: {
    title: 'debounceTime({{argument}})',
    operator: (arg, scheduler) => debounceTime(arg, scheduler),
    argumentType: ARGUMENT_TYPE.NUMBER
  },
  map: {
    title: 'map({{argument}})',
    operator: (arg, scheduler) => map(arg),
    argumentType: ARGUMENT_TYPE.FUNCTION
  },
  filter: {
    title: 'map({{argument}})',
    operator: (arg, scheduler) => filter(arg),
    argumentType: ARGUMENT_TYPE.FUNCTION
  },
  auditTime: {
    title: 'auditTime({{argument}})',
    operator: (arg, scheduler) => auditTime(arg, scheduler),
    argumentType: ARGUMENT_TYPE.NUMBER
  },
  sample: {
    title: 'sample({{argument}})',
    operator: (arg, scheduler) => sample(arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
  skip: {
    title: 'skip({{argument}})',
    operator: (arg, scheduler) => skip(arg),
    argumentType: ARGUMENT_TYPE.NUMBER
  },
  skipUntil: {
    title: 'skipUntil({{argument}})',
    operator: (arg, scheduler) => skipUntil(arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
  skipWhile: {
    title: 'skipWhile({{argument}})',
    operator: (arg, scheduler) => skipWhile(arg),
    argumentType: ARGUMENT_TYPE.FUNCTION
  },
  take: {
    title: 'take({{argument}})',
    operator: (arg, scheduler) => take(arg),
    argumentType: ARGUMENT_TYPE.NUMBER
  },
  takeUntil: {
    title: 'takeUntil({{argument}})',
    operator: (arg, scheduler) => takeUntil(arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
  takeWhile: {
    title: 'takeWhile({{argument}})',
    operator: (arg, scheduler) => takeWhile(arg),
    argumentType: ARGUMENT_TYPE.FUNCTION
  },
  concatMap: {
    title: 'concatMap(x => {{argument}})',
    operator: (arg, scheduler) => concatMap(x => arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
  mergeMap: {
    title: 'mergeMap(x => {{argument}})',
    operator: (arg, scheduler) => mergeMap(x => arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
  switchMap: {
    title: 'switchMap(x => {{argument}})',
    operator: (arg, scheduler) => switchMap(x => arg),
    argumentType: ARGUMENT_TYPE.OBSERVABLE
  },
};
