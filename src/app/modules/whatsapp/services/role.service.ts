import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles() {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.get<Role[]>(`${environment.url_api}role/`, {
      headers: headers,
    });

  }

  getRoleById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.get<Role>(`${environment.url_api}role/${id}`, {
      headers: headers,
    });
  }

  insertRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    // let param = new HttpParams();
    // param = param.append("name", value.name);
    // param = param.append("description", value.description);
    // param = param.append("config", value.config);

    return this.http.post(`${environment.url_api}role`, value, {
      headers: headers,
    });
  }

  updateRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    // let param = new HttpParams();
    // param = param.append("name", value.name);
    // param = param.append("description", value.description);
    // param = param.append("config", value.config.toString());
    return this.http.put(`${environment.url_api}role/${value.id}`, value, {
      headers: headers,
    });
  }

  deleteRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.delete(`${environment.url_api}role/${value.id}`, {
      headers: headers,
    });
  }
}
