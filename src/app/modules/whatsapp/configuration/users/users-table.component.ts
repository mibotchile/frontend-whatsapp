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
import { RoleService } from "../../services/role.service";
import { GroupService } from "../../services/group.service";

// export interface EntityId {
//   id: number;
//   name: string;
// }


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
  dataSource: MatTableDataSource<User> | null;

  columns: TableColumn<User>[] = [
    { label: "Nombre", property: "name", type: "text", visible: true },
    {
      label: "Email",
      property: "email",
      type: "text",
      visible: true,
    },
    { label: "Grupos", property: "groups_id", type: "button", visible: true },
    { label: "Rol", property: "role_id", type: "text", visible: true },
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
    private roleService: RoleService,
    private groupService: GroupService
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
    this.subscription = this.userService.getUsers().subscribe((data: any) => {
      this.userTableData = data.data.filter((n) => n.status === 1);
      this.deactivatedUserTableData = data.data.filter((n) => n.status === 0);
      this.isChecked
        ? (this.dataSource.data = this.userTableData)
        : (this.dataSource.data = this.deactivatedUserTableData);
    });
  }

  getGroupNameById(id: number){
    // this.subscription = new Subscription();
    // this.subscription = this.groupService.getGroupById(id).subscribe((response: any) => {
      
    // })
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

  deleteUser(user: User) {
    this.subscription = new Subscription();
    this.subscription = this.userService.deleteUser(user).subscribe(
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
