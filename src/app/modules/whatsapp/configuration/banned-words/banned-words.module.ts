import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannedWordsComponent } from "./banned-words.component";
import { IconModule } from "@visurel/iconify-angular";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BannedWordsRoutingModule } from "./banned-words-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CreateUpdateWordComponent } from "./create-update-word/create-update-word.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmationModule } from "src/app/components/dialogs/confirmation/confirmation.module";

@NgModule({
    declarations: [BannedWordsComponent, CreateUpdateWordComponent],
    imports: [
        BannedWordsRoutingModule,
        FlexLayoutModule,
        CommonModule,
        ConfirmationModule,
        IconModule,
        MatIconModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
    ],
})
export class BannedWordsModule {}
