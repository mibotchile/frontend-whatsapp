import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: '',
        outlet: 'configurationUsers',
        loadChildren: () => import('./users/users-table.module').then(m => m.UsersTableModule),
      },
      {
        path: '',
        outlet: 'configurationRoles',
        loadChildren: () => import('./roles/roles-table.module').then(m => m.RolesTableModule),
      },
      {
        path: '',
        outlet: 'configurationGroups',
        loadChildren: () => import('./groups/groups-table.module').then(m => m.GroupsTableModule),
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
