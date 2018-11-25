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
}
