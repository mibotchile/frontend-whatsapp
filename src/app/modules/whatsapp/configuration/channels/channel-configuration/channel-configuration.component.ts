import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
    selector: "frontend-whatsapp-channel-configuration",
    templateUrl: "./channel-configuration.component.html",
    styleUrls: ["./channel-configuration.component.scss"],
})
export class ChannelConfigurationComponent implements OnInit {
    items = ["Mensaje", "Petición de Datos", "Menu de Opciones", "Valoración de la Atención"];

    basket = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ChannelConfigurationComponent>
    ) {}

    ngOnInit(): void {}

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    deleteItem(i: number){
        this.basket.splice(i,1);
    }
}
