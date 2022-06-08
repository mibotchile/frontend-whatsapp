import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icSecurity from "@iconify/icons-ic/security";
import { Role } from "../../../models/role.model";
import { Selector } from "../role-selector/selector";

@Component({
  selector: "frontend-whatsapp-role-create-update",
  templateUrl: "./role-create-update.component.html",
  styleUrls: ["./role-create-update.component.scss"],
})
export class RoleCreateUpdateComponent implements OnInit {

  allLinks: Selector[] = [
    {
      name: "Conversaciones",
      tabs: [],
      hasTabs: false,
      childrens: [],
      permissions: ["Crear", "Leer", "Actualizar", "Eliminar"],
      hasChildrens: false,
      hasPermissions: true,
    },
    {
      name: "Configuración",
      tabs: [
        {
          name: "Usuarios",
          permissions: ["Crear", "Leer", "Actualizar", "Eliminar"],
          hasPermissions: true,
        },
        {
          name: "Grupos",
          permissions: ["Crear", "Leer", "Actualizar", "Eliminar"],
          hasPermissions: true,
        },
        {
          name: "Canales",
          permissions: ["Crear", "Leer", "Actualizar", "Eliminar"],
          hasPermissions: true,
        },
        {
          name: "Roles",
          permissions: ["Crear", "Leer", "Actualizar", "Eliminar"],
          hasPermissions: true,
        },
      ],
      hasTabs: true,
      childrens: [],
      permissions: [],
      hasChildrens: false,
      hasPermissions: false,
    },
  ];

  icClose = icClose;
  icSecurity = icSecurity;

  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RoleCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Role;
    }

    this.form = this.fb.group({
      name: this.defaults.name,
      description: this.defaults.description,
      config: [this.allLinks]
    });
  }

  save() {
    if (this.mode === "create") {
      this.createRole();
    } else if (this.mode === "update") {
      this.updateRole();
    }
  }

  createRole() {
    const role = this.form.value;

    this.dialogRef.close(role);
  }

  updateRole() {
    const role = this.form.value;
    role.id = this.defaults.id;

    this.dialogRef.close(role);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

}
