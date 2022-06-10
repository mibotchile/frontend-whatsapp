import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolesTableRoutingModule } from "./roles-table-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { TreeModule } from "@circlon/angular-tree-component";
import { RoleCreateUpdateComponent } from "./role-create-update/role-create-update.component";
import { ButtonGroupComponent } from "./role-selector/button-group/button-group.component";
import { RoleSelectorComponent } from "./role-selector/role-selector.component";
import { TabComponent } from "./role-selector/tab/tab.component";
import { RolesTableComponent } from "./roles-table.component";
import { IconModule } from "@visurel/iconify-angular";
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    RolesTableComponent,
    RoleCreateUpdateComponent,
    RoleSelectorComponent,
    ButtonGroupComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
    RolesTableRoutingModule,
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
    TreeModule,
    MatCheckboxModule,
    MatListModule,
    IconModule,
    MatSnackBarModule
  ],
})
export class RolesTableModule {}
