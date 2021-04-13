import { NgModule } from '@angular/core';
import { PuzzleComponent } from './puzzle';
import { ResultModule } from '../../components/result/result.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { StreamModule } from '../../components/stream/stream.module';
import { OperatorModule } from '../../components/operator/operator.module';
import { SuccessDialogComponent } from './success-dialog/success-dialog';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
    ResultModule,

    DragDropModule,

    StreamModule,
    OperatorModule
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
