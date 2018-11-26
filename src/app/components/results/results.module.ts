import { NgModule } from '@angular/core';
import { ResultsComponent } from './results';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { StreamModule } from '../stream/stream.module';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    StreamModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule {}
