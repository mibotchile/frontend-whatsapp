import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from "@angular/material/tree";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";

 interface OptionNode {
    name: string;
    children?: OptionNode[];
  }

  interface OptionFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }

  const TREE_DATA: OptionNode[] = [
    {
      name: 'Movistar',
      children: [{name: 'Atencion'}, {name: 'Consultas'}, {name: 'Soporte'}],
    },
    {
      name: 'Claro',
      children: [
        {
          name: 'Atencion',
          children: [{name: 'Asesor'}, {name: 'Bot'}],
        },
        {
          name: 'Soporte',
          children: [{name: 'Asesor'}, {name: 'Bot'}],
        },
      ],
    },
  ];

@Component({
    selector: "frontend-whatsapp-action-options-menu",
    templateUrl: "./action-options-menu.component.html",
    styleUrls: ["./action-options-menu.component.scss"],
})
export class ActionOptionsMenuComponent implements OnInit {

    icClose = icClose;
    icPeople = icPeople;

    menus: Menu[];
    menu: Menu;

    form: FormGroup;
    mode: "create" | "update" = "create";

    private _transformer = (node: OptionNode, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level: level,
        };
      };

      treeControl = new FlatTreeControl<OptionFlatNode>(
        node => node.level,
        node => node.expandable,
      );

      treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
      );

      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionOptionsMenuComponent>,
        private fb: FormBuilder
    ) {

        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: OptionFlatNode) => node.expandable;
    hasNoContent = (_: number, node: OptionFlatNode) => node.name === '';

    ngOnInit(): void {

        this.menus = [];

         this.menu = {
            id: 0,
            title: "",
            options: [],
            items: []
         };

        this.mode = "create";

        this.form = this.fb.group({
            id: this.menu.id,
            message: this.menu.title,
        });

    }

    addNewItem(node: OptionFlatNode) {

      }


    save() {
        if (this.mode === "create") {
            this.createMessage();
        } else if (this.mode === "update") {
            this.updateMessage();
        }
    }

    createMessage() {
        const message = this.form.value;

        this.defaults.messages.push(message);
        this.dialogRef.close(this.defaults);
    }

    updateMessage() {
        const message = this.form.value;
        message.id = this.defaults.id;

        this.dialogRef.close(message);
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }
}

