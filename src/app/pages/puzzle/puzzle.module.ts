import { NgModule } from '@angular/core';
import { PuzzleComponent } from './puzzle';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { ResultsModule } from '../../components/results/results.module';
import { ObservableModule } from '../../components/observable/observable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { StreamModule } from '../../components/stream/stream.module';
import { OperatorModule } from '../../components/operator/operator.module';
import { ArgModule } from '../../components/arg/arg.module';
import { SuccessDialogComponent } from './success-dialog/success-dialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PuzzleComponent,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ResultsModule,

    DragDropModule,

    StreamModule,
    ObservableModule,
    OperatorModule,
    ArgModule
  ],
  exports: [
    PuzzleComponent,
    SuccessDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent
  ]
})
export class PuzzleModule {}
