import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeDashboardComponent } from './welcome-dashboard/welcome-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
