import { NgModule } from '@angular/core';
import { ObservableComponent } from './observable';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    ObservableComponent
  ],
  imports: [
    CommonModule,

    MatCardModule
  ],
  exports: [
    ObservableComponent
  ]
})
export class ObservableModule {}
