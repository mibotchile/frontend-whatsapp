import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsTableComponent } from './groups-table.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsTableRoutingModule { }
