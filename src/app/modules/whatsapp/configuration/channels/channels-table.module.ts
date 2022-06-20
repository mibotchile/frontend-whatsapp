import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelsTableRoutingModule } from './channels-table-routing.module';
import { ChannelsTableComponent } from './channels-table.component';
import { IconModule } from '@visurel/iconify-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ChannelsTableComponent
  ],
  imports: [
    CommonModule,
    ChannelsTableRoutingModule,
    IconModule,
    ReactiveFormsModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule
  ]
})
export class ChannelsTableModule { }
