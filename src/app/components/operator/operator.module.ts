import { NgModule } from '@angular/core';
import { OperatorComponent } from './operator';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    OperatorComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    OperatorComponent
  ]
})
export class OperatorModule {}
