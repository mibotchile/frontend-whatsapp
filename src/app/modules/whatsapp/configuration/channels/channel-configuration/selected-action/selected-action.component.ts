import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import { ActionMessageComponent } from "./action-message/action-message.component";
import { Channel } from "src/app/modules/whatsapp/models/channel.model";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "frontend-whatsapp-selected-action",
    templateUrl: "./selected-action.component.html",
    styleUrls: ["./selected-action.component.scss"],
})
export class SelectedActionComponent implements OnInit {

    icEdit = icEdit;
    icDelete = icDelete;

    @Input()
    label: string;
    @Input()
    position: string;

    @Output()
    deleteItemEvent = new EventEmitter<void>();

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    onDelete(){
        this.deleteItemEvent.emit();
    }

    editMessage(){
        this.dialog
            .open(ActionMessageComponent)
            .afterClosed()
            .subscribe((channel: Channel) => {
                // if (role) {
                //     this.subscription = new Subscription();
                //     this.subscription = this.roleService.insertRole(role).subscribe(
                //         () => {
                //             this.snackbar.open("Rol creado exitosamente.", "Completado", {
                //                 duration: 3000,
                //                 horizontalPosition: "center",
                //                 panelClass: ["green-snackbar"],
                //             });
                //             this.getData();
                //         },
                //         ({ error }) => {
                //             this.snackbar.open(error.message, "X", {
                //                 duration: 3000,
                //                 horizontalPosition: "center",
                //                 panelClass: ["red-snackbar"],
                //             });
                //         }
                //     );
                // }
            });
    }
}

