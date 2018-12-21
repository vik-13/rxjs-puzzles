import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PuzzleComponent } from './pages/puzzle/puzzle';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'puzzle/:id',
  component: PuzzleComponent
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
