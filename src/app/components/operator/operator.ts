import { Component, HostBinding, Input } from '@angular/core';
import { checkValidity } from '../../puzzles/operators';

@Component({
  selector: 'rxp-operator',
  templateUrl: 'operator.html',
  styleUrls: ['operator.scss']
})
export class OperatorComponent {
  @Input()
  set inner(value) { this.innerClass = value; }
  @HostBinding('class.inner') innerClass = false;

  @Input()
  get operator() { return this._operator; }
  set operator(operatorContainer) {
    this._operator = operatorContainer;
  }
  private _operator;

  validity() {
    return this.operator && checkValidity(this.operator);
  }
}
