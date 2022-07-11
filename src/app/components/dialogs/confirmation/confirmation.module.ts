import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationComponent } from "./confirmation.component";
import { MatButtonModule } from "@angular/material/button";
import { FlexModule } from "@angular/flex-layout";

@NgModule({
    declarations: [ConfirmationComponent],
    imports: [CommonModule, MatButtonModule, FlexModule],
})
export class ConfirmationModule {}
