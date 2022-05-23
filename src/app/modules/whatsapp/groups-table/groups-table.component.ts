import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icCancel from '@iconify/icons-ic/outline-close';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { GroupCreateUpdateComponent } from './group-create-update/group-create-update.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../models/group.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, of, ReplaySubject, scheduled } from 'rxjs';
import { FormControl } from '@angular/forms';
import { filter, map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { groupTableData, groupTableLabels } from 'src/static-data/group-table-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';

@UntilDestroy()
@Component({
  selector: 'frontend-whatsapp-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class GroupsTableComponent implements OnInit, AfterViewInit {

  subject$: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);
  data$: Observable<Group[]> = this.subject$.asObservable();
  groups: Group[];

  @Input()
  columns: TableColumn<Group>[] = [
    { label: 'Nombre', property: 'name', type: 'text', visible: true },
    { label: 'Descripción', property: 'description', type: 'text', visible: true },
    { label: 'Etiquetas', property: 'labels', type: 'button', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Group> | null;
  searchCtrl = new FormControl();

  labels = groupTableLabels;

  icSearch = icSearch;
  icFilterList = icFilterList;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  icDelete = icDelete;
  icCancel = icCancel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private dialog: MatDialog) {

   }

   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

   getData() {
     return of(groupTableData.map(group => new Group(group)));
   }

  ngOnInit(): void {
    this.getData().subscribe(groups => {
      this.subject$.next(groups);
    });

    this.data$.pipe(
      filter<Group[]>(Boolean)
    ).subscribe(groups =>{
      this.groups = groups;
      this.dataSource.data = groups;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
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
      width: '500px',
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  onLabelChange(change: MatSelectChange, row: Group) {
    const index = this.groups.findIndex(c => c === row);
    this.groups[index].tags = change.value;
    this.subject$.next(this.groups);
  }
  
}




