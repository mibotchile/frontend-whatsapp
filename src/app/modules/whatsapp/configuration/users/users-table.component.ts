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
import { MatPaginator, PageEvent } from "@angular/material/paginator";
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
import { UserView } from "../../models/user-view.model";
import { MenuService } from "src/app/services/menu.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@UntilDestroy()
@Component({
  selector: "frontend-whatsapp-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {

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

  userTableData: UserView[];
  deactivatedUserTableData: User[];

  length: number;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<UserView> | null;
  dataSourceForSearch: MatTableDataSource<UserView> | null;

  columns: TableColumn<UserView>[] = [
    { label: "Nombre", property: "name", type: "text", visible: true },
    {
      label: "Email",
      property: "email",
      type: "text",
      visible: true,
    },
    { label: "Grupos", property: "groups", type: "button", visible: true },
    { label: "Rol", property: "role", type: "button", visible: true },
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
    private snackbar: MatSnackBar,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
      this.subscription = this.menuService.getConfigObs().subscribe((response)=>{
        this.menu = response;
      });
      this.isChecked = true;
      this.getData(1, this.pageSize);
    this.dataSource = new MatTableDataSource();
    this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.onFilterChange(value));
  }

  getData(page?: number, pageSize?: number) {
    this.subscription = new Subscription();
    if (this.isChecked) {
        this.subscription = this.userService.getActiveUsers(page, pageSize).subscribe((result: any) => {
            this.dataSource.data = result.data.users;
            this.length = result.data.length;
            //console.log(this.length)
        });
    } else {
        this.subscription = this.userService.getInactiveUsers(page, pageSize).subscribe((result: any) => {
            this.dataSource.data = result.data.users;
            this.length = result.data.length;
        },({error})=>{this.dataSource.data = []});
    }
}

OnPageChange(event: PageEvent) {
    this.getData(event.pageIndex + 1, event.pageSize);
}

showData() {

  this.isChecked = !this.isChecked;
  this.paginator.pageSize = 10;
  this.paginator.firstPage();
  this.getData(1, this.pageSize);
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
              this.snackbar.open("Usuario creado exitosamente.", "Completado", {
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

                if (user.uid === this.authService.getUid()) {
                  this.authService
                  .logout()
                  .then(() => {
                    //this.router.navigate(['/login']);
                    window.location.href = `${environment.main_url}/logout`;
                  })
                  .catch((error) => console.log(error));
                }

                this.snackbar.open(
                  "Usuario actualizado exitosamente.",
                  "Completado",
                  {
                    duration: 3000,
                    horizontalPosition: "center",
                    panelClass: ["green-snackbar"],
                  }
                );
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

  deleteUser(user: User) {
    this.subscription = new Subscription();
    this.subscription = this.userService.deleteUser(user).subscribe(
      () => {
        this.snackbar.open("Usuario eliminado exitosamente.", "Completado", {
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

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  menuVisibility(value: string) {
    for (const item of this.menu) {
        for (const i of item.tabs) {
            if (i.name === 'user') {
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

onFilterChange(value: string) {
  // if (!this.dataSource) {
  //   return;
  // }

  value = value.trim();
  value = value.toLowerCase();

  this.subscription = new Subscription();
  this.subscription = this.userService.searchUserByName(value).subscribe((response: any) => {
      this.dataSourceForSearch = response.data.users;
      if (value === "") {
        this.dataSource = new MatTableDataSource();
        this.getData(1, this.pageSize);
      } else {
        this.dataSourceForSearch = response.data.users;
        this.dataSource = this.dataSourceForSearch;
      }
  });
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
