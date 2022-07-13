import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DataRequestStatusService {

    private deactivationStatus$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {}

    getStatusObs(): Observable<boolean> {
        return this.deactivationStatus$.asObservable();
    }

    setConfigObs(status: boolean){
        this.deactivationStatus$.next(status);
    }

}
