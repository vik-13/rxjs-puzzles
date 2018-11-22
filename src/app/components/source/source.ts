import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxp-source',
  templateUrl: 'source.html',
  styleUrls: ['source.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceComponent {}
