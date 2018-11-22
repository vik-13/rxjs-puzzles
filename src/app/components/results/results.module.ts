import { NgModule } from '@angular/core';
import { ResultsComponent } from './results';
import { CommonModule } from '@angular/common';
import { BeadModule } from '../bead/bead.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    BeadModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule {}
