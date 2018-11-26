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
  get destination() {
    return this._destination;
  }
  set destination(value) {
    this._destination = value || (() => of());
    this.prepareOutputDestination();
  }
  private _destination;

  outputSource$ = new ReplaySubject(1);
  outputDestination$ = new ReplaySubject(1);
  isEqual = false;

  compareSubscription: Subscription;

  constructor() {
    this.compareSubscription = this.outputSource$.pipe(switchMap((sourceList) => {
      return this.outputDestination$.pipe(map(destinationList => [sourceList, destinationList]));
    })).subscribe(([sourceList, destinationList]: [any[], any[]]) => {
      this.isEqual = true;
      if (sourceList.length === destinationList.length) {
        sourceList.forEach((item, index) => {
          if (item.value !== destinationList[index].value || item.time !== destinationList[index].time) {
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

    if (this.validate()) {
      this.source.root[0].value(scheduler)
        .pipe(...this.source.operators.map((item) => item.operator.operator(item.value[0].value, scheduler)))
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

  prepareOutputDestination() {
    const stop$ = new Subject();
    const scheduler = new VirtualTimeScheduler(undefined, 100);

    this.destination(scheduler)
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
        this.outputDestination$.next(list);
      });

    scheduler.flush();
    stop$.next();
  }

  validate() {
    if (!this.source.root.length) {
      return false;
    }

    let isValid = true;
    this.source.operators.forEach((operatorContainer) => {
      if (!operatorContainer.value.length) {
        isValid = false;
      } else if (typeof operatorContainer.value[0].value !== operatorContainer.operator.argumentType) {
        isValid = false;
      }
    });

    console.log('isValid', isValid);

    return isValid;
  }

  ngOnDestroy() {
    this.compareSubscription.unsubscribe();
  }
}
