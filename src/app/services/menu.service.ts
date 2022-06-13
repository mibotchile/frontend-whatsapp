import { Injectable } from "@angular/core";
import { UserService } from "../modules/whatsapp/services/user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  getConfig(): Observable<any> {
    return this.userService.getUserByUid(this.authService.getUid()).pipe(
      map(n=>n.data.role.config)
    );
  }

}
