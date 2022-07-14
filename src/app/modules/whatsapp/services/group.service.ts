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

        return this.http.get<Group[]>(url);
    }

    getActiveGroups(page?: number, pageSize?: number) {
        let url = `${environment.url_api}group/actives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }


        return this.http.get<Group[]>(url);
    }

    getInactiveGroups(page?: number, pageSize?: number) {
        let url = `${environment.url_api}group/inactives`;
        if (page && pageSize) {
            url += `?page=${page}&pageSize=${pageSize}`;
        }


        return this.http.get<Group[]>(url);
    }

    searchGroupByName(name: string) {


        return this.http.get<Group[]>(`${environment.url_api}group/search/?name=${name}`);
    }

    getGroupById(id: number) {

        return this.http.get<Group>(`${environment.url_api}group/${id}`);
    }

    insertGroup(value: Group) {


        let param = new HttpParams();
        param = param.append("name", value.name);
        param = param.append("description", value.description);
        //param = param.append('tags',value.tags.toString());

        return this.http.post(`${environment.url_api}group`, value);
    }

    updateGroup(value: Group) {

        let param = new HttpParams();
        //let id = value.id.toString();
        param = param.append("name", value.name);
        param = param.append("description", value.description);
        param = param.append("tags", value.tags.toString());
        return this.http.put(`${environment.url_api}group/${value.id}`, value);
    }

    deleteGroup(value: Group) {


        return this.http.delete(`${environment.url_api}group/${value.id}`);
    }
}
