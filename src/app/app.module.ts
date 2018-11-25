import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PuzzleModule } from './pages/puzzle/puzzle.module';
import { MatToolbarModule } from '@angular/material';
import { PuzzlesModule } from './puzzles/puzzles.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    DashboardModule,
    PuzzleModule,

    PuzzlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
