import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandling implements ErrorHandler {
  private router: Router;
  constructor(injector: Injector) {
    setTimeout(() => (this.router = injector.get(Router)));
  }

  handleError(error: any): void {
    console.log(error.message, error);
    if (error.status === 0) {
      // this.router.navigateByUrl('/server-error');
    }
    if (error.status === 401) {
      localStorage.clear();
      document.location.reload();
    }
  }
}
