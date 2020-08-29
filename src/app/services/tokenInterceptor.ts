import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";

import { throwError, Observable } from "rxjs";
import { map, take, catchError } from "rxjs/operators";
import { CommonService } from "./common.service";
import { BaseService } from "./base.service";
import { SmsService } from "./sms.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService,
    private baseService: SmsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.commonService.isUserLogged()) {
      if (this.commonService.isTokenExpired()) {
        this.commonService.signOut();
        return throwError("Session Ended");
      }
      if (
        !request.url.includes("login") &&
        !request.url.includes("register") &&
        !request.url.includes("assets")
      ) {
        request = this.addToken(request, localStorage.getItem("userToken"));
      }
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.commonService.signOut();
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(this.baseService.getAuthHeader());
  }
}
