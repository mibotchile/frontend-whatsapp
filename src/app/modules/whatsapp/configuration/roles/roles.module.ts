import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesTableComponent } from './roles-table.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    RolesTableComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    RolesTableComponent
  ]
})
export class RolesModule { }
