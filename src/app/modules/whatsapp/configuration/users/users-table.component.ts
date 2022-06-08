import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icEdit from "@iconify/icons-ic/twotone-edit";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { User } from "../../models/user.model";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { UserCreateUpdateComponent } from "./user-create-update/user-create-update.component";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface UserView {
  id: number;
  uid: string;
  name: string;
  email: string;
  groupNames: Array<string>;
  roleName: string;
  status: number;
}

@Component({
  selector: "frontend-whatsapp-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {
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

  userTableData: User[];
  deactivatedUserTableData: User[];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<UserView> | null;

  columns: TableColumn<UserView>[] = [
    { label: "Nombre", property: "name", type: "text", visible: true },
    {
      label: "Email",
      property: "email",
      type: "text",
      visible: true,
    },
    { label: "Grupos", property: "groupNames", type: "button", visible: true },
    { label: "Rol", property: "roleName", type: "text", visible: true },
    { label: "Acciones", property: "actions", type: "button", visible: true },
  ];

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getData();
    this.dataSource = new MatTableDataSource();
  }

  getData() {
    this.subscription = new Subscription();
    // this.subscription = this.userService.getUsers().subscribe((data: any) => {
    //   this.userTableData = data.data.filter((n) => n.status === 1);
    //   this.deactivatedUserTableData = data.data.filter((n) => n.status === 0);
    //   this.isChecked
    //     ? (this.dataSource.data = this.userTableData)
    //     : (this.dataSource.data = this.deactivatedUserTableData);
    // });
    this.subscription = this.userService
      .getUsersWithRoleAndGroupNames()
      .subscribe(
        (result) => {
          let data = [];

          result[0].data.forEach((element) => {
            data.push({
              id: element.id,
              uid: element.uid,
              name: element.name,
              email: element.email,
              groups_id: element.groups_id,
              role_id: element.role_id,
              groupNames: result[1].data
                .filter((n) => element.groups_id.includes(n.id))
                .map((x) => x.name),
              roleName: result[2].data
                .filter((n) => element.role_id === n.id)
                .map((x) => x.name)
                .toString(),
            });
          });
          this.dataSource.data = data;
        },
        (error) => {
          this.snackbar.open(error.message, "X", {
            duration: 3000,
            horizontalPosition: "right",
            panelClass: ['red-snackbar']
          });
        }
      );
  }

  showData() {
    this.getData();
  }

  createUser() {
    this.dialog
      .open(UserCreateUpdateComponent)
      .afterClosed()
      .subscribe((user: User) => {
        if (user) {
          this.subscription = new Subscription();
          this.subscription = this.userService.insertUser(user).subscribe(
            () => {
              this.snackbar.open('Usuario creado exitosamente.', "X", {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: ['green-snackbar']
              });
              this.getData();
            },
            (error) => {
              this.snackbar.open(error.message, "X", {
                duration: 3000,
                horizontalPosition: "center",
                panelClass: ['red-snackbar']
              });
            }
          );
        }
      });
  }

  updateUser(user: User) {
    this.dialog
      .open(UserCreateUpdateComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe((updatedUser) => {
        if (updatedUser) {
          this.subscription = new Subscription();
          this.subscription = this.userService
            .updateUser(updatedUser)
            .subscribe(
              () => {
                this.snackbar.open('Usuario actualizado exitosamente.', "X", {
                  duration: 3000,
                  horizontalPosition: 'center',
                  panelClass: ['green-snackbar']
                });
                this.getData();
              },
              (error) => {
                this.snackbar.open(error.message, "X", {
                  duration: 3000,
                  horizontalPosition: "center",
                  panelClass: ['red-snackbar']
                });
              }
            );
        }
      });
  }

  deleteUser(user: User) {
    this.subscription = new Subscription();
    this.subscription = this.userService.deleteUser(user).subscribe(
      () => {
        this.snackbar.open('Usuario eliminado exitosamente.', "X", {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: ['green-snackbar']
        });
        this.getData();
      },
      (error) => {
        this.snackbar.open(error.message, "X", {
          duration: 3000,
          horizontalPosition: "center",
          panelClass: ['red-snackbar']
        });
      }
    );
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
