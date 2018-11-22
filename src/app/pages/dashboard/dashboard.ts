import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxp-dashboard',
  templateUrl: 'dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
