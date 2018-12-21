import { NgModule } from '@angular/core';
import { StreamComponent } from './stream';
import { CommonModule } from '@angular/common';
import { BeadComponent } from './bead/bead';
import { BeadGroupComponent } from './bead-group/bead-group';

@NgModule({
  declarations: [
    StreamComponent,
    BeadComponent,
    BeadGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StreamComponent,
    BeadComponent,
    BeadGroupComponent
  ]
})
export class StreamModule {}
