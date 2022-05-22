import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icPeople from '@iconify/icons-ic/people';
import { FormGroup } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'frontend-whatsapp-group-create-update',
  templateUrl: './group-create-update.component.html',
  styleUrls: ['./group-create-update.component.scss']
})
export class GroupCreateUpdateComponent implements OnInit {

  icClose = icClose;
  icPeople = icPeople;

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<GroupCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

}
