import { Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icAdd from '@iconify/icons-ic/twotone-add';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';

export interface Group {
  name: string;
  description: string;
  tags: string;
  actions: any;
}

const GROUP_DATA: Group[] = [
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
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnInit {

  icSearch = icSearch;
  icFilterList = icFilterList;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;

  displayedColumns: string[] = ['name', 'description', 'tags','actions'];
  dataSource = GROUP_DATA;

  constructor() { }

  ngOnInit(): void {
  }


}

