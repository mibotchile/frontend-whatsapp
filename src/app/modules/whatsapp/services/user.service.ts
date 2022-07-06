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
    myUserId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    onMyUserIdChanges$: Observable<number> = this.myUserId$.asObservable();
    userId: number;

    constructor(private http: HttpClient, private groupService: GroupService, private roleService: RoleService) {}

    setMyUserId(userId: number) {
        this.myUserId$.next(userId);
        this.userId = userId;
    }

    getUsers(page?: number, pageSize?: number): Observable<UserView[]> {
        let url = `${environment.url_api}user`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<UserView[]>(url, {
            headers: headers,
        });
    }

    getActiveUsers(page?: number, pageSize?: number) {
        let url = `${environment.url_api}user/actives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<UserView[]>(url, { headers: headers });
    }

    getInactiveUsers(page?: number, pageSize?: number) {
        let url = `${environment.url_api}user/inactives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<UserView[]>(url, { headers: headers });
    }

    searchUserByName(name: string) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        return this.http.get<UserView[]>(`${environment.url_api}user/search/?name=${name}`, { headers: headers });
    }

    getUserById(id: number) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<any>(`${environment.url_api}user/${id}`, {
            headers: headers,
        });
    }

    getUserByUid(uid: string) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<any>(`${environment.url_api}user/uid/${uid}`, {
            headers: headers,
        });
    }

    insertUser(value: User) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        let param = new HttpParams();
        param = param.append("uid", value.uid);
        param = param.append("name", value.name);
        param = param.append("email", value.email);
        param = param.append("groups_id", value.groups_id.toString());
        param = param.append("role_id", value.role_id.toString());

        return this.http.post(`${environment.url_api}user`, param, {
            headers: headers,
        });
    }

    updateUser(value: User) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        let param = new HttpParams();
        param = param.append("uid", value.uid);
        param = param.append("name", value.name);
        param = param.append("email", value.email);
        param = param.append("groups_id", value.groups_id.toString());
        param = param.append("role_id", value.role_id);

        return this.http.put(`${environment.url_api}user/${value.id}`, value, {
            headers: headers,
        });
    }

    deleteUser(value: User) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        return this.http.delete(`${environment.url_api}user/${value.id}`, {
            headers: headers,
        });
    }

    getGroups(userId: string) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get(`${environment.url_api}user/${userId}/groups`, {
            headers: headers,
        });
    }
}
