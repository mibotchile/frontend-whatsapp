import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private clientUid: string;
    private projectUid: string;

    endpoint = environment.aim.endpoint;
    headers = new HttpHeaders({
        mibot_session: '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}',
    });

    constructor(private auth: Auth, private http: HttpClient) {}

    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }

    getUserIdToken(): Observable<string> {
        return from(this.auth.currentUser.getIdToken());
    }

    getUserName() {
        return this.auth.currentUser.displayName;
    }

    getUid() {
        return this.auth.currentUser.uid;
    }

    setClientAndProjectUid(client: string, project: string) {
        this.clientUid = client;
        this.projectUid = project;
    }

    getClientAndProjectUid() {
        return {
            client: this.clientUid,
            project: this.projectUid,
        };
    }

    getUserData() {
        return this.http.get(`${this.endpoint}users/${this.getUid()}`, { headers: this.headers });
    }
}
