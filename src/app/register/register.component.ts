import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../models/userRegister';
import { UserService } from '../services/user.service';
import { SmsService } from '../services/sms.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister: UserRegister = new UserRegister();
  otpVerfied = false;
  notMatch = false;
  messageSent = false;
  formSubmited = false;
  verifiedMessage: string;
  processing = false;
  checked: boolean;
  constructor(
    private userService: UserService,
    private smsService: SmsService,
    public commonService: CommonService,
    private router: Router
  ) {}
  ngOnInit() {}
  register() {
    console.log(this.userRegister);
    this.formSubmited = true;
    this.processing = true;
    this.commonService.loading = true;
    this.userService.register(this.userRegister).subscribe(
      (res: any) => {
        console.log(res.Token);
        localStorage.setItem('userToken', res.token);
        this.commonService.userName = res.firstName;
        this.userService.setUserName(res.firstName);
        this.commonService.coins = res.coins;
        this.userService.setCoins(res.coins);
        localStorage.photoUrl = res.userPhoto;
        if (res.userPhoto !== null) {
          this.commonService.userPhoto = res.userPhoto;
        }
        localStorage.userNa = res.firstName;
        this.commonService.success = true;
        this.processing = false;
        this.commonService.loading = false;
        this.router.navigate(['/drink-win']);
      },
      (err: any) => {
        console.log(err.error.Message);
        this.commonService.error = true;
        this.processing = false;
        this.commonService.message = err.error.Message;
        this.commonService.loading = false;
      }
    );
  }
  sendOtp() {
    this.commonService.error = false;
    this.commonService.success = false;
    this.processing = true;
    this.messageSent = false;
    this.otpVerfied = false;
    this.smsService.sendOtp(this.userRegister.mobileNumber).subscribe(
      (res: any) => {
        this.processing = false;
        this.messageSent = true;
      },
      (err: any) => {
        console.log(err.error);
        this.commonService.error = true;
        this.processing = false;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
  verifyOtp(otp: string) {
    this.commonService.error = false;
    this.commonService.success = false;
    this.processing = true;
    this.userRegister.Otp = otp;
    this.smsService.verifyOtp(this.userRegister.mobileNumber, otp).subscribe(
      (res: any) => {
        this.otpVerfied = true;
        this.processing = false;
        this.verifiedMessage = res;
      },
      (err: any) => {
        console.log(err);
        this.commonService.error = true;
        this.processing = false;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
  checkPassword(confirmPassword) {
    this.notMatch = this.userRegister.password !== confirmPassword;
  }
  acceptTerms(event) {
    this.checked = event;
  }
}
