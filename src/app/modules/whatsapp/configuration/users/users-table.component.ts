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

  constructor(private dialog: MatDialog, private userService: UserService) {}

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
      .subscribe((result) => {
        let data = [];

        result[0].data.forEach((element) => {
          data.push({
            id: element.id,
            uid: element.uid,
            name: element.name,
            email: element.email,
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
        console.log(this.dataSource.data);
      });
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
