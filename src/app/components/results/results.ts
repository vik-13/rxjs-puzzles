import { Component, Input, OnDestroy } from '@angular/core';
import { of, ReplaySubject, Subject, Subscription, Timestamp, VirtualTimeScheduler } from 'rxjs';
import { map, observeOn, reduce, switchMap, takeUntil, timestamp } from 'rxjs/operators';

@Component({
  selector: 'rxp-results',
  templateUrl: 'results.html',
  styleUrls: ['results.scss']
})
export class ResultsComponent implements OnDestroy {

  @Input()
  get source() {
    return this._source;
  }
  set source(value) {
    if (value) {
      value.subscribe((data) => {
        this._source = data;
        this.prepareOutputSource();
      });
    }
  }
  private _source;

  @Input()
  get result() {
    return this._result;
  }
  set result(value) {
    if (value) {
      this._result = value.map((item) => ({time: item[0], value: item[1]}));
    } else {
      this._result = [];
    }
    this.outputDestination$.next(this._result);
  }
  private _result;

  outputSource$ = new ReplaySubject(1);
  outputDestination$ = new ReplaySubject(1);
  isEqual = false;

  compareSubscription: Subscription;

  constructor() {
    this.compareSubscription = this.outputSource$.subscribe((sourceList: any[]) => {
      this.isEqual = true;
      if (sourceList.length === this.result.length) {
        sourceList.forEach((item, index) => {
          if (item.value !== this.result[index].value || item.time !== this.result[index].time) {
            this.isEqual = false;
          }
        });
      } else {
        this.isEqual = false;
      }
      console.log(this.isEqual);
    });
  }

  prepareOutputSource() {
    const stop$ = new Subject();
    const scheduler = new VirtualTimeScheduler(undefined, 100);

    console.log(this.source);
    if (this.source.valid) {
      this.source.data.observable[0].func(scheduler)
        .pipe(...this.source.data.operators.map((item) => item.func(item.values[0].value, scheduler)))
        .pipe(observeOn(scheduler))
        .pipe(timestamp(scheduler))
        .pipe(map((data: Timestamp<any>) => ({value: data.value, time: data.timestamp})))
        .pipe(takeUntil(stop$))
        .pipe(reduce((a: any, b: any) => {
          return a.concat(b);
        }, []))
        .pipe(map((list: any[]) => {
          return list.map((item) => {
            if (typeof item.value === 'boolean' ) {
              item.value = item.value ? 'T' : 'F';
            }
            return item;
          });
        }))
        .subscribe((list) => {
          this.outputSource$.next(list);
        });

      scheduler.flush();
      stop$.next();
    } else {
      this.outputSource$.next([]);
    }
  }

  ngOnDestroy() {
    this.compareSubscription.unsubscribe();
  }
}
