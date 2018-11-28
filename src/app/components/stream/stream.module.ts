import { NgModule } from '@angular/core';
import { StreamComponent } from './stream';
import { CommonModule } from '@angular/common';
import { BeadModule } from './bead/bead.module';

@NgModule({
  declarations: [
    StreamComponent
  ],
  imports: [
    CommonModule,

    BeadModule
  ],
  exports: [
    StreamComponent
  ]
})
export class StreamModule {}
