import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesTableComponent } from './roles-table.component';

const routes: Routes = [
  {
    path: '',
    component: RolesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesTableRoutingModule { }
