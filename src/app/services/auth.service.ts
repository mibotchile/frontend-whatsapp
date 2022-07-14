import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {

    private clientUid: string;
    private projectUid: string;

    constructor(private auth: Auth) {}

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

    setClientAndProjectUid(client: string, project: string){
        this.clientUid = client;
        this.projectUid = project;
    }

    getClientAndProjectUid(){
        return {
            client: this.clientUid,
            project: this.projectUid
        }
    }
}
