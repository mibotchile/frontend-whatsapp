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
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "frontend-whatsapp-roles-table",
  templateUrl: "./roles-table.component.html",
  styleUrls: ["./roles-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class RolesTableComponent implements OnInit , OnDestroy , AfterViewInit{
  //Icons
  icSearch = icSearch;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;
  icDelete = icDelete;
  icEdit = icEdit;
  //Icons end

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isChecked = true;

  subscription: Subscription;

  roleTableData: Role[];
  deactivatedRoleTableData: Role[];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<Role> | null;

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
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  constructor(private dialog: MatDialog,private roleService: RoleService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.searchCtrl.valueChanges
    //   .pipe(untilDestroyed(this))
    //   .subscribe((value) => this.onFilterChange(value));
    this.getData();
    this.dataSource = new MatTableDataSource();
  }

  getData() {
    this.subscription = new Subscription();
    this.subscription = this.roleService.getRoles().subscribe((data: any) => {
      this.roleTableData = [];
      this.deactivatedRoleTableData = [];
      for (let item of data.data) {
        console.log(item);
        if (item.status === 0) {
          this.deactivatedRoleTableData.push(item);
        } else {
          this.roleTableData.push(item);
        }
      }
      if (this.isChecked) {
        this.dataSource.data = this.roleTableData;
      } else {
        this.dataSource.data = this.deactivatedRoleTableData;
      }
      console.log(this.dataSource.data);
    });
  }

  showData() {
    this.getData();
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
              console.log("Success");
              this.getData();
            },
            (error) => {
              console.log(`Error: ${error}`);
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
          this.subscription = this.roleService
            .updateRole(updatedRole)
            .subscribe(
              () => {
                console.log("Success");
                this.getData();
              },
              (error) => {
                console.log(`Error: ${error}`);
              }
            );
        }
      });
  }

  deleteRole(role: Role) {
    this.subscription = new Subscription();
    this.subscription = this.roleService.deleteRole(role).subscribe(
      () => {
        console.log("Success");
        this.getData();
      },
      (error) => {
        console.log(`Error: ${error}`);
      }
    );
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }
}
