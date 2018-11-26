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
  @HostBinding('class.mat-card') matCardClass = true;

  @Input()
  get operator() { return this._operator; }
  set operator(operatorContainer) {
    console.log('set operator');
    this._operator = operatorContainer;
    this.isValid = true;
    if (!operatorContainer.value.length) {
      this.isValid = false;
    } else if (typeof operatorContainer.value[0].value !== operatorContainer.operator.argumentType) {
      this.isValid = false;
    }
  }
  private _operator;

  isValid = true;
}
