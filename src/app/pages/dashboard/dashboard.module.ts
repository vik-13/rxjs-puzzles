import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StreamModule } from '../../components/stream/stream.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatCardModule,
    StreamModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
