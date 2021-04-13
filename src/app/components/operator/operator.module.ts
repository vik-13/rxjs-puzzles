import { NgModule } from '@angular/core';
import { OperatorComponent } from './operator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    OperatorComponent
  ],
  imports: [
    CommonModule,

    MatCardModule
  ],
  exports: [
    OperatorComponent
  ]
})
export class OperatorModule {}
