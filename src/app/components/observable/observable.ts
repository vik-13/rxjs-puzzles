import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'rxp-observable',
  templateUrl: 'observable.html',
  styleUrls: ['observable.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservableComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;
  // TODO: Fix it! mat-card shouldn't be added just like this. In case if there is no <mat-card>, it won't be rendered.
  // @HostBinding('class.mat-card') matCardClass = true;
}
