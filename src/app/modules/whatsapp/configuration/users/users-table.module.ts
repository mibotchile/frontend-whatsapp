import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableRoutingModule } from './users-table-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { IconModule } from '@visurel/iconify-angular';
import { UsersTableComponent } from './users-table.component';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';


@NgModule({
  declarations: [UsersTableComponent,UserCreateUpdateComponent],
  imports: [
    CommonModule,
    UsersTableRoutingModule,
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
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class UsersTableModule { }
