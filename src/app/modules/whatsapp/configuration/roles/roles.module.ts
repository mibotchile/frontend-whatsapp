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
import { RoleCreateUpdateComponent } from './role-create-update/role-create-update.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import { TreeModule } from '@circlon/angular-tree-component';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { ButtonGroupComponent } from './role-selector/button-group/button-group.component';

@NgModule({
  declarations: [
    RolesTableComponent,
    RoleCreateUpdateComponent,
    RoleSelectorComponent,
    ButtonGroupComponent
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
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatStepperModule,
    TreeModule,
    MatCheckboxModule,
    MatListModule
  ],
  exports: [
    RolesTableComponent
  ]
})
export class RolesModule { }
