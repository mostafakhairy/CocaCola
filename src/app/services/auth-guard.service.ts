import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}
  canActivate() {
    if (this.commonService.isUserLogged() && !this.commonService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
