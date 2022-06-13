import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import icSearch from "@iconify/icons-ic/twotone-search";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icAdd from "@iconify/icons-ic/twotone-add";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icCancel from "@iconify/icons-ic/outline-close";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import { GroupCreateUpdateComponent } from "./group-create-update/group-create-update.component";
import { MatDialog } from "@angular/material/dialog";
import { Group } from "../../models/group.model";
import { COMMA, ENTER, G } from "@angular/cdk/keycodes";
import { Observable, of, ReplaySubject, scheduled, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { filter, map, startWith } from "rxjs/operators";
import { MatChipInputEvent, MatChipList } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import { GroupService } from "../../services/group.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@UntilDestroy()
@Component({
  selector: "frontend-whatsapp-groups-table",
  templateUrl: "./groups-table.component.html",
  styleUrls: ["./groups-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class GroupsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  // subject$: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);
  // data$: Observable<Group[]> = this.subject$.asObservable();
  groups: Group[];

  groupTableData: Group[];
  deactivatedGroupTableData: Group[];

  length: number;

  isChecked: boolean;

  subscription: Subscription;

  @Input()
  columns: TableColumn<Group>[] = [
    { label: "Nombre", property: "name", type: "text", visible: true },
    {
      label: "Descripción",
      property: "description",
      type: "text",
      visible: true,
    },
    { label: "Etiquetas", property: "labels", type: "button", visible: true },
    { label: "Acciones", property: "actions", type: "button", visible: true },
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Group> | null;
  searchCtrl = new FormControl();

  tags: string[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  icSearch = icSearch;
  icFilterList = icFilterList;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  icDelete = icDelete;
  icCancel = icCancel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private groupService: GroupService,
    private snackbar: MatSnackBar
  ) {
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getData(page?:number,pageSize?:number) {
    this.subscription = new Subscription();
    if (this.isChecked) {
      this.subscription = this.groupService.getActiveGroups(page,pageSize).subscribe((result: any) => {
        this.dataSource.data = result.data.groups;
        this.length = result.data.length;
        console.log(this.length)
      });
    } else {
      this.subscription = this.groupService.getInactiveGroups(page,pageSize).subscribe((result: any) => {
        this.dataSource.data = result.data.groups;
        this.length = result.data.length;
      });
    }
    
  }

  OnPageChange(event: PageEvent){
    console.log(event)
    this.getData(event.pageIndex+1,event.pageSize);
  }

  ngOnInit(): void {
    // this.getData().subscribe(groups => {
    //   this.subject$.next(groups);
    // });
    //this.searchDataByName("grupo 7");
    this.isChecked = true;
    this.length = 100;

    this.getData(1,this.pageSize);

    this.dataSource = new MatTableDataSource();

    // this.data$.pipe(filter<Group[]>(Boolean)).subscribe((groups) => {
    //   this.groups = groups;
    //   this.dataSource.data = groups;
    // });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  searchDataByName(name: string) {
    this.subscription = new Subscription();
    this.subscription = this.groupService
      .searchGroupByName(name)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  createGroup() {
    this.dialog
      .open(GroupCreateUpdateComponent)
      .afterClosed()
      .subscribe((group: Group) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (group) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          // this.groups.unshift(new Group(group));
          // this.subject$.next(this.groups);

          this.subscription = new Subscription();
          this.subscription = this.groupService.insertGroup(group).subscribe(
            () => {
              this.snackbar.open("Grupo creado exitosamente.", "Completado", {
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

  updateGroup(group: Group) {
    this.dialog
      .open(GroupCreateUpdateComponent, {
        data: group,
      })
      .afterClosed()
      .subscribe((updatedGroup) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (updatedGroup) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          // const index = this.groups.findIndex(
          //   (existingGroup) => existingGroup.id === updatedGroup.id
          // );
          // this.groups[index] = new Group(updatedGroup);
          // this.subject$.next(this.groups);
          this.subscription = new Subscription();
          this.subscription = this.groupService
            .updateGroup(updatedGroup)
            .subscribe(
              () => {
                this.snackbar.open(
                  "Grupo actualizado exitosamente.",
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

  deleteGroup(group: Group) {
    this.subscription = new Subscription();
    this.subscription = this.groupService.deleteGroup(group).subscribe(
      () => {
        this.snackbar.open("Grupo eliminado exitosamente.", "Completado", {
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

  onLabelChange(change: MatSelectChange, row: Group) {
    const index = this.groups.findIndex((c) => c === row);
    this.groups[index].tags = change.value;
    //this.subject$.next(this.groups);
  }

  add(event: MatChipInputEvent, group: Group): void {
    const value = (event.value || "").trim();
    if (value) {
      group.tags.push(value);
      this.subscription = new Subscription();
      this.subscription = this.groupService.updateGroup(group).subscribe(
        () => {
          this.snackbar.open("Se agrego una etiqueta.", "Completado", {
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
    event.chipInput!.clear();
  }

  remove(tag: string, group: Group): void {
    const index = group.tags.indexOf(tag);

    if (index >= 0) {
      group.tags.splice(index, 1);
    }

    this.subscription = new Subscription();
    this.subscription = this.groupService.updateGroup(group).subscribe(
      () => {
        this.snackbar.open("Se elimino una etiqueta.", "Completado", {
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

  showData() {
    this.isChecked = !this.isChecked;
    this.getData(1,this.pageSize);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
