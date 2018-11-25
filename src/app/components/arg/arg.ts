import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rxp-arg',
  templateUrl: 'arg.html',
  styleUrls: ['arg.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArgComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;
}
