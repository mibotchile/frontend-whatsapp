import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: '',
    data: {
      containerEnabled: true,
    },
    children: [
      {
        path: '',
        redirectTo: 'configuration'
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,

      },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WhatsappRoutingModule { }
