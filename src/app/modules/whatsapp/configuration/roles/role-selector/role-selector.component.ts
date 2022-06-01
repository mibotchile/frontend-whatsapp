import { Component, OnInit } from "@angular/core";
import { Selector } from "./selector";

@Component({
  selector: "frontend-whatsapp-role-selector",
  templateUrl: "./role-selector.component.html",
  styleUrls: ["./role-selector.component.scss"],
})
export class RoleSelectorComponent implements OnInit {
  toggle = {};
  tags: string[];

  data: Selector[] = [
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
    }
  ];

  constructor() {

  }

  ngOnInit(): void {}

}
