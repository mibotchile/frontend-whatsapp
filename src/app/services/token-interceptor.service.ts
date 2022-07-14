import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getUserIdToken().pipe(
      take(1),
      switchMap((token) => {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            mibot_session: `{"project_uid":"${this.authService.getClientAndProjectUid().project}","client_uid":"${this.authService.getClientAndProjectUid().client}"}`
          },
        });
        return next.handle(req);
      })
    );
  }
}
