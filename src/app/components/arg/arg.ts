import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'rxp-arg',
  templateUrl: 'arg.html',
  styleUrls: ['arg.scss']
})
export class ArgComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;
  // TODO: Fix it! mat-card shouldn't be added just like this. In case if there is no <mat-card>, it won't be rendered.
  @HostBinding('class.mat-card') matCardClass = true;
}
