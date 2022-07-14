import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserView } from "../models/user-view.model";
import { User } from "../models/user.model";
import { GroupService } from "./group.service";
import { RoleService } from "./role.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    myUserId$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    onMyUserIdChanges$: Observable<User> = this.myUserId$.asObservable();
    user: User;

    constructor(private http: HttpClient, private groupService: GroupService, private roleService: RoleService) {}

    setMyUserId(user: User) {
        this.myUserId$.next(user);
        this.user = user;
    }

    getUsers(page?: number, pageSize?: number): Observable<UserView[]> {
        let url = `${environment.url_api}user`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }


        return this.http.get<UserView[]>(url);
    }

    getActiveUsers(page?: number, pageSize?: number) {
        let url = `${environment.url_api}user/actives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }


        return this.http.get<UserView[]>(url);
    }

    getInactiveUsers(page?: number, pageSize?: number) {
        let url = `${environment.url_api}user/inactives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }


        return this.http.get<UserView[]>(url);
    }

    searchUserByName(name: string) {


        return this.http.get<UserView[]>(`${environment.url_api}user/search/?name=${name}`);
    }

    getUserById(id: number) {

        return this.http.get<any>(`${environment.url_api}user/${id}`);
    }

    getUserByUid(uid: string) {


        return this.http.get<any>(`${environment.url_api}user/uid/${uid}`);
    }

    insertUser(value: User) {


        let param = new HttpParams();
        param = param.append("uid", value.uid);
        param = param.append("name", value.name);
        param = param.append("email", value.email);
        param = param.append("groups_id", value.groups_id.toString());
        param = param.append("role_id", value.role.id.toString());

        return this.http.post(`${environment.url_api}user`, param
        );
    }

    updateUser(value: User) {


        let param = new HttpParams();
        param = param.append("uid", value.uid);
        param = param.append("name", value.name);
        param = param.append("email", value.email);
        param = param.append("groups_id", value.groups_id.toString());
        param = param.append("role_id", value.role.id);

        return this.http.put(`${environment.url_api}user/${value.id}`, value);
    }

    deleteUser(value: User) {


        return this.http.delete(`${environment.url_api}user/${value.id}`);
    }

    getGroups(userId: string) {

        return this.http.get(`${environment.url_api}user/${userId}/groups`);
    }
}
