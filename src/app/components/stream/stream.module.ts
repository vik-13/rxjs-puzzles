import { NgModule } from '@angular/core';
import { StreamComponent } from './stream';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    StreamComponent
  ],
  imports: [
    CommonModule,

    DragDropModule,
    MatCardModule
  ],
  exports: [
    StreamComponent
  ]
})
export class StreamModule {}
