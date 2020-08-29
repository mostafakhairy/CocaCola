import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  notMatch = false;
  constructor(public commonService: CommonService,
              private userService: UserService,
              private route: Router) { }

  ngOnInit() {
  }
  checkPassword(confirmPassword, password) {
     this.notMatch = password !== confirmPassword;
  }
  changePassword(password: string) {
    this.commonService.loading = true;
    const mobileNumber = localStorage.forgetPasswordMobNo;
    this.userService.ChangePassword(mobileNumber, password).subscribe((res: any) => {
      localStorage.removeItem('forgetPasswordMobNo');
      this.commonService.loading = false;
      this.route.navigateByUrl('login');
    }, (err: any) => {
      this.commonService.error = true;
      this.commonService.message = err.error.Message || err.error.message;
      this.commonService.loading = false;
    });
  }
}
