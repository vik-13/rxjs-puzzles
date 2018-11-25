import { NgModule } from '@angular/core';
import { ArgComponent } from './arg';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    ArgComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ArgComponent
  ]
})
export class ArgModule {}
