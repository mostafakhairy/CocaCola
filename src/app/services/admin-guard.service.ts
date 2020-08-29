import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CommonService } from "./common.service";
import { animate } from "@angular/animations";

@Injectable({
  providedIn: "root"
})
export class AdminGuardService implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}
  canActivate() {
    if (this.commonService.isAdmin()) {
      return true;
    } else {
      this.router.navigateByUrl("/home");
      return false;
    }
  }
}
