import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxp-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
