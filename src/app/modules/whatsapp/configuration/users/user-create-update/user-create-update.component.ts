import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import icPeople from '@iconify/icons-ic/people';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { GroupService } from '../../../services/group.service';
import { Subscription } from 'rxjs';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'frontend-whatsapp-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  icClose = icClose;
  icPeople = icPeople;

  subscription: Subscription;
  groupList: string[];
  roleList: string[];

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults : any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private fb: FormBuilder,
              private groupService: GroupService,
              private roleService: RoleService) { 
    }

  ngOnInit(): void {

    this.getGroupList();
    this.getRoleList();

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as User;
    }

    this.form = this.fb.group({
      name: this.defaults.name,
      email: this.defaults.email,
      // groups_id: this.defaults.groups_id,
      // role_id: this.defaults.role_id
    });

  }

  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  getGroupList(){
    this.subscription = new Subscription();
    this.subscription = this.groupService.getGroups().subscribe((data: any) => {
      this.groupList = data.data.filter((n) => n.status === 1).map((x)=>x.name);
    });
  }

  getRoleList(){
    this.subscription = new Subscription();
    this.subscription = this.roleService.getRoles().subscribe((data: any) => {
      this.roleList = data.data.filter((n) => n.status === 1).map((x)=>x.name);
    });
  }

  createUser() {
    const user = this.form.value;

    this.dialogRef.close(user);
  }

  updateUser() {
    const user = this.form.value;
    user.id = this.defaults.id;

    this.dialogRef.close(user);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
