import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuardService implements CanActivate {

  constructor() { }
  canActivate() {
    return localStorage.forgetPasswordMobNo !== undefined || localStorage.forgetPasswordMobNo != null;
  }
}
