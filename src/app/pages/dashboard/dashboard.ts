import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PuzzlesService } from '../../puzzles/puzzles.service';

@Component({
  selector: 'rxp-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  puzzles = [];

  constructor(private puzzlesService: PuzzlesService) {
    this.puzzles = puzzlesService.getAll();
  }
}
