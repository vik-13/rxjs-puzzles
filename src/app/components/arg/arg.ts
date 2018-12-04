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
  @HostBinding('class.mat-card') matCardClass = true;
}
