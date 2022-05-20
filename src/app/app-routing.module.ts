import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      // {
      //   path: 'dashboards/analytics',
      //   redirectTo: '/'
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      // },
      // {
      //   path: 'whatsapp',
      //   loadChildren: () => import('./modules/whatsapp/whatsapp.module').then(m => m.WhatsappModule),
      // },
      // {
      //   path: '**',
      //   loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
