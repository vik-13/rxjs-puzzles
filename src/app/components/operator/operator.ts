import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'rxp-operator',
  templateUrl: 'operator.html',
  styleUrls: ['operator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;
}
