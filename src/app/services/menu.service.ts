import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Selector } from "../modules/whatsapp/configuration/roles/role-selector/selector";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor() {}

  private configObs$: BehaviorSubject<Selector[]> = new BehaviorSubject([]);

  getConfigObs(): Observable<Selector[]> {
    return this.configObs$.asObservable();
  }

  setConfigObs(config: Selector[]){
    this.configObs$.next(config);
  }

}
