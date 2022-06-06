import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ProgressService } from "./progress.service";

@Injectable({
  providedIn: "root",
})
export class CustomHttpInterceptorService implements HttpInterceptor {
  constructor(private progressService: ProgressService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressService.show();

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progressService.hide();
          }
        },
        (error) => {
          this.progressService.hide();
        }
      )
    );
  }
}
