import { NgModule } from '@angular/core';
import { SourceComponent } from './source';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    SourceComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    DragDropModule
  ],
  exports: [
    SourceComponent
  ]
})
export class SourceModule {}
