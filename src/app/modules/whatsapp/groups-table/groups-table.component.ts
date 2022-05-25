import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
import { Group } from "../models/group.model";
import { COMMA, ENTER, G } from "@angular/cdk/keycodes";
import { Observable, of, ReplaySubject, scheduled, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { filter, map, startWith } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import {
  groupTableData,
  groupTableLabels,
} from "src/static-data/group-table-data";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import { GroupService } from "../services/group.service";

@UntilDestroy()
@Component({
  selector: "frontend-whatsapp-groups-table",
  templateUrl: "./groups-table.component.html",
  styleUrls: ["./groups-table.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
})
export class GroupsTableComponent implements OnInit, AfterViewInit {
  // subject$: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);
  // data$: Observable<Group[]> = this.subject$.asObservable();
  groups: Group[];

  groupTableData: Group[];
  deactivatedGroupTableData: Group[];

  subscription: Subscription;

  @Input()
  columns: TableColumn<Group>[] = [
    { label: "Nombre", property: "name", type: "text", visible: true },
    {
      label: "Descripción",
      property: "description",
      type: "text",
      visible: true
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
  tagsCtrl = new FormControl();

  icSearch = icSearch;
  icFilterList = icFilterList;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  icDelete = icDelete;
  icCancel = icCancel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private groupService: GroupService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getData() {
    this.subscription = new Subscription();
    this.subscription = this.groupService.getGroups().subscribe((data: any) => {
      this.groupTableData = [];
      this.deactivatedGroupTableData = [];
      for (let item of data.data) {
        if (item.status === 0) {
          this.deactivatedGroupTableData.push(item);
        }
        else
        {
          this.groupTableData.push(item);
        }
        this.dataSource.data = this.groupTableData;
      }
      console.log(this.groupTableData);
    });
    //return of(groupTableData.map(group => new Group(group)));
  }

  ngOnInit(): void {
    // this.getData().subscribe(groups => {
    //   this.subject$.next(groups);
    // });

    this.getData();

    this.dataSource = new MatTableDataSource();

    // this.data$.pipe(filter<Group[]>(Boolean)).subscribe((groups) => {
    //   this.groups = groups;
    //   this.dataSource.data = groups;
    // });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
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
    // this.dialog.open(GroupCreateUpdateComponent).afterClosed().subscribe((group: Group) => {
    //   /**
    //    * Customer is the updated customer (if the user pressed Save - otherwise it's null)
    //    */
    //   if (group) {
    //     /**
    //      * Here we are updating our local array.
    //      * You would probably make an HTTP request here.
    //      */
    //     this.groups.unshift(new Group(group));
    //     //this.subject$.next(this.groups);
    //   }
    // });
    const dialogRef = this.dialog.open(GroupCreateUpdateComponent, {
      width: "500px",
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      //this.animal = result;
    });
  }

  createGroup1() {
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

  updateGroup(group: Group) {
    console.log(group);
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

  deleteGroup(group: Group) {
    console.log(group)
    this.subscription = new Subscription();
    this.subscription = this.groupService.deleteGroup(group).subscribe(
      () => {
        console.log("Success");
        this.getData();
      },
      (error) => {
        console.log(`Error: ${error}`);
      }
    );
  }

  onLabelChange(change: MatSelectChange, row: Group) {
    const index = this.groups.findIndex((c) => c === row);
    this.groups[index].tags = change.value;
    //this.subject$.next(this.groups);
  }

  add(event: MatChipInputEvent,group: Group): void {
    const value = (event.value || '').trim();

    if (value) {
      this.subscription = new Subscription();
      this.subscription = this.groupService.updateGroup(group).subscribe(
        () => {
          console.log(group)
          this.getData();
        },
        (error) => {
          console.log(`Error: ${error}`);
        }
      );
    }
  }
}
