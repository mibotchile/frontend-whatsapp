import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icCancel from '@iconify/icons-ic/outline-close';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { GroupCreateUpdateComponent } from './group-create-update/group-create-update.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../Models/group.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

export interface Groupi {
  name: string;
  description: string;
  tags: string;
  actions: any;
}

const GROUP_DATA: Groupi[] = [
  {name: 'Grupo 1', description: 'Grupo 1', tags: 'G1', actions: ''},
  {name: 'Grupo 2', description: 'Grupo 2', tags: 'G1', actions: ''},
  {name: 'Grupo 3', description: 'Grupo 3', tags: 'G1', actions: ''},
  {name: 'Grupo 4', description: 'Grupo 4', tags: 'G1', actions: ''},
  {name: 'Grupo 5', description: 'Grupo 5', tags: 'G1', actions: ''},
  {name: 'Grupo 6', description: 'Grupo 6', tags: 'G1', actions: ''},
  {name: 'Grupo 7', description: 'Grupo 7', tags: 'G1', actions: ''},
  {name: 'Grupo 8', description: 'Grupo 8', tags: 'G1', actions: ''},
  {name: 'Grupo 9', description: 'Grupo 9', tags: 'G1', actions: ''},
  {name: 'Grupo 10', description: 'Grupo 10', tags: 'G1', actions: ''},
];


@Component({
  selector: 'frontend-whatsapp-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss'],
})
export class GroupsTableComponent implements OnInit {

  animal: string;
  name: string;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  //subject$: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);

  icSearch = icSearch;
  icFilterList = icFilterList;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;
  icEdit = icEdit;
  icDelete = icDelete;
  icCancel = icCancel;

  displayedColumns: string[] = ['name', 'description', 'tags','actions'];
  dataSource = GROUP_DATA;

  groups: Group[];

  constructor(private dialog: MatDialog) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }

  ngOnInit(): void {
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
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  
}




