import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { of, ReplaySubject, Subject, Timestamp, VirtualTimeScheduler } from 'rxjs';
import { map, observeOn, reduce, takeUntil, timestamp } from 'rxjs/operators';

@Component({
  selector: 'rxp-results',
  templateUrl: 'results.html',
  styleUrls: ['results.scss']
})
export class ResultsComponent {

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  prepareOutputSource() {
    const stop$ = new Subject();
    const scheduler = new VirtualTimeScheduler(undefined, 100);

    if (this.validate(this.source)) {
      this.source.root[0].stream(scheduler)
        .pipe(...this.source.operators.map((item) => item.operator.operator(item.value[0].value, scheduler)))
        .pipe(observeOn(scheduler))
        .pipe(timestamp(scheduler))
        .pipe(map((data: Timestamp<any>) => ({value: data.value, time: data.timestamp})))
        .pipe(takeUntil(stop$))
        .pipe(reduce((a: any, b: any) => {
          return a.concat(b);
        }, []))
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
      .subscribe((list) => {
        this.outputDestination$.next(list);
      });

    scheduler.flush();
    stop$.next();
  }

  validate(tree) {
    if (!this.source.root.length) {
      return false;
    }

    let isValid = true;
    this.source.operators.forEach((operator) => {
      if (operator.operator.required && !operator.value.length) {
        isValid = false;
      }
    });

    return isValid;
  }
}
