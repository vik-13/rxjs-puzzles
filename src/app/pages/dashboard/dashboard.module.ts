import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StreamModule } from '../../components/stream/stream.module';

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
