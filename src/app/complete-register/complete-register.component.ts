import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UserRegister } from '../models/userRegister';
import { SmsService } from '../services/sms.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.scss']
})
export class CompleteRegisterComponent implements OnInit {
  verified = false;
  code: string;
  messageSent = false;
  formSubmited = false;
  verifiedMessage: string;
  loading = false;
  checked: boolean;
  public user: UserRegister = new UserRegister();
  constructor(
    private router: Router,
    public commonService: CommonService,
    private smsService: SmsService,
    private userService: UserService
  ) {
    this.user.firstName = commonService.facebookUser.firstName;
    this.user.lastName = commonService.facebookUser.lastName;
    this.user.isFb = commonService.facebookUser.isFb;
    this.user.email = commonService.facebookUser.email;
    this.user.fbId = commonService.facebookUser.fbId;
    this.user.photoURL = commonService.facebookUser.photoURL;
  }

  ngOnInit() {}
  register() {
    console.log(this.user);
    this.formSubmited = true;
    this.loading = true;
    this.userService.register(this.user).subscribe(
      (res: any) => {
        console.log(res.Token);
        localStorage.setItem('userToken', res.token);
        localStorage.photoUrl = res.userPhoto;
        if (res.userPhoto !== null) {
          this.commonService.userPhoto = res.userPhoto;
        }
        this.commonService.userName = res.firstName;
        this.userService.setUserName(res.firstName);
        if (this.user.isFb) {
          localStorage.fbId = window.btoa(this.user.fbId);
          localStorage.authToken = this.commonService.facebookUser.authToken;
        }
        this.commonService.success = true;
        this.loading = false;
        this.userService.setCoins(res.coins);
        localStorage.removeItem('userLogin');
        this.userService.getNotificationCount().subscribe(res => {
          this.commonService.notificationCount = res;
        });
        this.router.navigate(['/drink-win']);
        localStorage.userNa = res.firstName;
      },
      (err: any) => {
        this.commonService.error = true;
        this.loading = false;
        this.commonService.message = err.error.Message;
      }
    );
  }
  sendOtp() {
    this.messageSent = false;
    this.verified = false;
    this.smsService.sendOtp(this.user.mobileNumber).subscribe(
      (res: any) => {
        this.messageSent = true;
      },
      (err: any) => {
        console.log(err.error);
        this.commonService.error = true;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
  verifyOtp(otp: string) {
    this.loading = true;
    this.user.Otp = otp;
    this.smsService.verifyOtp(this.user.mobileNumber, otp).subscribe(
      (res: any) => {
        this.loading = false;
        this.verified = true;
        this.verifiedMessage = res;
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.commonService.error = true;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
  acceptTerms(event) {
    this.checked = event;
  }
}
