import { NgModule } from '@angular/core';
import { PuzzlesService } from './puzzles.service';
import { DocModule } from '../doc/doc.module';

@NgModule({
  imports: [
    DocModule
  ],
  providers: [
    PuzzlesService
  ]
})
export class PuzzlesModule {}
