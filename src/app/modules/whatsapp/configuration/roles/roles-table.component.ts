import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icEdit from "@iconify/icons-ic/twotone-edit";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Role } from "../../models/role.model";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { RoleService } from "../../services/role.service";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { MatDialog } from "@angular/material/dialog";
import { RoleCreateUpdateComponent } from "./role-create-update/role-create-update.component";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenuService } from "src/app/services/menu.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: "frontend-whatsapp-roles-table",
    templateUrl: "./roles-table.component.html",
    styleUrls: ["./roles-table.component.scss"],
    animations: [fadeInUp400ms, stagger40ms],
})
export class RolesTableComponent implements OnInit, OnDestroy, AfterViewInit {
    menu: any;
    //Icons
    icSearch = icSearch;
    icAdd = icAdd;
    icMoreHoriz = icMoreHoriz;
    icDelete = icDelete;
    icEdit = icEdit;
    //Icons end

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    isChecked: boolean;

    subscription: Subscription;

    roleTableData: Role[];
    deactivatedRoleTableData: Role[];

    length: number;

    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    searchCtrl = new FormControl();
    dataSource: MatTableDataSource<Role> | null;
    dataSourceForSearch: MatTableDataSource<Role> | null;

    columns: TableColumn<Role>[] = [
        { label: "Nombre", property: "name", type: "text", visible: true },
        {
            label: "Descripción",
            property: "description",
            type: "text",
            visible: true,
        },
        // ,
        // { label: "Etiquetas", property: "labels", type: "button", visible: true },
        { label: "Acciones", property: "actions", type: "button", visible: true },
    ];

    get visibleColumns() {
        return this.columns.filter((column) => column.visible).map((column) => column.property);
    }

    constructor(
        private dialog: MatDialog,
        private roleService: RoleService,
        private snackbar: MatSnackBar,
        private menuService: MenuService
    ) {}
    ngAfterViewInit(): void {
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.subscription = new Subscription();
        this.subscription = this.menuService.getConfigObs().subscribe((response) => {
            this.menu = response;
        });
        this.isChecked = true;
        this.getData(1, this.pageSize);
        this.dataSource = new MatTableDataSource();

        this.searchCtrl.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe((value) => this.onFilterChange(value));
    }

    getData(page?: number, pageSize?: number) {
        this.subscription = new Subscription();
        if (this.isChecked) {
            this.subscription = this.roleService.getActiveRoles(page, pageSize).subscribe((result: any) => {
                this.dataSource.data = result.data.roles;
                this.length = result.data.length;
                //console.log(this.length)
            });
        } else {
            this.subscription = this.roleService.getInactiveRoles(page, pageSize).subscribe((result: any) => {
                this.dataSource.data = result.data.roles;
                this.length = result.data.length;
            });
        }
    }

    OnPageChange(event: PageEvent) {
        this.getData(event.pageIndex + 1, event.pageSize);
    }

    onFilterChange(value: string) {

        value = value.trim();
        value = value.toLowerCase();

        this.subscription = new Subscription();
        this.subscription = this.roleService.searchRoleByName(value).subscribe((response: any) => {
            this.dataSourceForSearch = response.data.roles;
            if (value === "") {
                this.dataSource = new MatTableDataSource();
                this.getData(1, this.pageSize);
            } else {
                this.dataSourceForSearch = response.data.roles;
                this.dataSource = this.dataSourceForSearch;
            }
        });
    }

    showData() {
        this.isChecked = !this.isChecked;
        this.paginator.pageSize = 10;
        this.paginator.firstPage();
        this.getData(1, this.pageSize);
    }

    createRole() {
        this.dialog
            .open(RoleCreateUpdateComponent)
            .afterClosed()
            .subscribe((role: Role) => {
                if (role) {
                    this.subscription = new Subscription();
                    this.subscription = this.roleService.insertRole(role).subscribe(
                        () => {
                            this.snackbar.open("Rol creado exitosamente.", "Completado", {
                                duration: 3000,
                                horizontalPosition: "center",
                                panelClass: ["green-snackbar"],
                            });
                            this.getData();
                        },
                        ({ error }) => {
                            this.snackbar.open(error.message, "X", {
                                duration: 3000,
                                horizontalPosition: "center",
                                panelClass: ["red-snackbar"],
                            });
                        }
                    );
                }
            });
    }

    updateRole(role: Role) {
        this.dialog
            .open(RoleCreateUpdateComponent, {
                data: role,
            })
            .afterClosed()
            .subscribe((updatedRole) => {
                if (updatedRole) {
                    this.subscription = new Subscription();
                    this.subscription = this.roleService.updateRole(updatedRole).subscribe(
                        () => {
                            this.snackbar.open("Rol actualizado exitosamente.", "Completado", {
                                duration: 3000,
                                horizontalPosition: "center",
                                panelClass: ["green-snackbar"],
                            });
                            this.getData();
                        },
                        ({ error }) => {
                            this.snackbar.open(error.message, "X", {
                                duration: 3000,
                                horizontalPosition: "center",
                                panelClass: ["red-snackbar"],
                            });
                        }
                    );
                }
            });
    }

    deleteRole(role: Role) {
        this.subscription = new Subscription();
        this.subscription = this.roleService.deleteRole(role).subscribe(
            () => {
                this.snackbar.open("Rol eliminado exitosamente.", "Completado", {
                    duration: 3000,
                    horizontalPosition: "center",
                    panelClass: ["green-snackbar"],
                });
                this.getData();
            },
            ({ error }) => {
                this.snackbar.open(error.message, "X", {
                    duration: 3000,
                    horizontalPosition: "center",
                    panelClass: ["red-snackbar"],
                });
            }
        );
    }

    menuVisibility(value: string) {
      for (const item of this.menu) {
          for (const i of item.tabs) {
              if (i.name === "role") {
                  for (const j of i.permissions) {
                      if (j === value) {
                          return true;
                      }
                  }
              }
          }
      }
      false;
  }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }
}
