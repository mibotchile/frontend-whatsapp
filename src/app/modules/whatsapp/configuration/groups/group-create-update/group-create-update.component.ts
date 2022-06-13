import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icPeople from '@iconify/icons-ic/people';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '../../../models/group.model';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'frontend-whatsapp-group-create-update',
  templateUrl: './group-create-update.component.html',
  styleUrls: ['./group-create-update.component.scss']
})
export class GroupCreateUpdateComponent implements OnInit {

  icClose = icClose;
  icPeople = icPeople;

  isChecked = true;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults : any,
              private dialogRef: MatDialogRef<GroupCreateUpdateComponent>,
              private fb: FormBuilder) { 
    }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
      this.isChecked= !!this.defaults.status;
    } else {
      this.defaults = {} as Group;
    }

    this.form = this.fb.group({
      name: this.defaults.name,
      description: this.defaults.description
    });

  }

  save() {
    if (this.mode === 'create') {
      this.createGroup();
    } else if (this.mode === 'update') {
      this.updateGroup();
    }
  }

  changeStatus(){
    this.isChecked = !this.isChecked; 
  }

  createGroup() {
    const group = this.form.value;
    group.status = +this.isChecked;
    this.dialogRef.close(group);
  }

  updateGroup() {
    const group = this.form.value;
    group.id = this.defaults.id;
    group.tags = this.defaults.tags;
    group.status = +this.isChecked;

    this.dialogRef.close(group);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
