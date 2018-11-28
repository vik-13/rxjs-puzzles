import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'rxp-operator',
  templateUrl: 'operator.html',
  styleUrls: ['operator.scss']
})
export class OperatorComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;
  @HostBinding('class.mat-card') matCardClass = true;

  @Input()
  get operator() { return this._operator; }
  set operator(operatorContainer) {
    this._operator = operatorContainer;
  }
  private _operator;

  isValid() {
    let isValid = true;
    if (!this.operator) {
      return isValid;
    }
    if (!this.operator.values.length) {
      isValid = false;
    } else if (typeof this.operator.values[0].value !== this.operator.argType) {
      isValid = false;
    }
    return isValid;
  }
}
