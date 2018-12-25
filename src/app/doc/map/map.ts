import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxp-map-doc',
  templateUrl: 'map.html',
  styleUrls: ['map.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapDocComponent {}
