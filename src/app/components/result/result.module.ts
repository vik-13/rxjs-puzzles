import { NgModule } from '@angular/core';
import { ResultComponent } from './result';
import { CommonModule } from '@angular/common';
import { StreamModule } from '../stream/stream.module';
import { MatCardModule } from '@angular/material/card';

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
