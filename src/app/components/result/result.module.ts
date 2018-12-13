import { NgModule } from '@angular/core';
import { ResultComponent } from './result';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { StreamModule } from '../stream/stream.module';

@NgModule({
  declarations: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    StreamModule
  ],
  exports: [
    ResultComponent
  ]
})
export class ResultModule {}
