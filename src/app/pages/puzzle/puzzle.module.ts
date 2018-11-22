import { NgModule } from '@angular/core';
import { PuzzleComponent } from './puzzle';
import { MatCardModule } from '@angular/material';
import { ResultsModule } from '../../components/results/results.module';
import { SourceModule } from '../../components/source/source.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { StreamModule } from '../../components/stream/stream.module';

@NgModule({
  declarations: [
    PuzzleComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ResultsModule,

    DragDropModule,

    StreamModule,
    SourceModule
  ],
  exports: [
    PuzzleComponent
  ]
})
export class PuzzleModule {}
