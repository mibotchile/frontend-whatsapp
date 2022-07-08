import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Group } from "../models/group.model";

@Injectable({
    providedIn: "root",
})
export class GroupService {
    groupSubject$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);
    groupChangesListener$: Observable<Group> = this.groupSubject$.asObservable();

    constructor(private http: HttpClient) {}
    changeGroup(group: Group) {
        console.log(group);

        this.groupSubject$.next(group);
    }

    getGroups(page?: number, pageSize?: number) {
        let url = `${environment.url_api}group`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<Group[]>(url, { headers: headers });
    }

    getActiveGroups(page?: number, pageSize?: number) {
        let url = `${environment.url_api}group/actives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<Group[]>(url, { headers: headers });
    }

    getInactiveGroups(page?: number, pageSize?: number) {
        let url = `${environment.url_api}group/inactives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }

        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<Group[]>(url, { headers: headers });
    }

    searchGroupByName(name: string) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        return this.http.get<Group[]>(`${environment.url_api}group/search/?name=${name}`, { headers: headers });
    }

    getGroupById(id: number) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        return this.http.get<Group>(`${environment.url_api}group/${id}`, {
            headers: headers,
        });
    }

    insertGroup(value: Group) {
        //value.tags = ['']
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        let param = new HttpParams();
        param = param.append("name", value.name);
        param = param.append("description", value.description);
        //param = param.append('tags',value.tags.toString());

        return this.http.post(`${environment.url_api}group`, value, { headers: headers });
    }

    updateGroup(value: Group) {
        //value.tags = ['update1','update2'];
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );
        // const param: string = JSON.stringify(value);
        let param = new HttpParams();
        //let id = value.id.toString();
        param = param.append("name", value.name);
        param = param.append("description", value.description);
        param = param.append("tags", value.tags.toString());
        return this.http.put(`${environment.url_api}group/${value.id}`, value, { headers: headers });
    }

    deleteGroup(value: Group) {
        let headers = new HttpHeaders();
        headers = headers.append(
            "mibot_session",
            '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
        );

        return this.http.delete(`${environment.url_api}group/${value.id}`, { headers: headers });
    }
}
