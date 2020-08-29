import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { SmsService } from "../services/sms.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  messageSent = false;
  disableButtons = false;
  constructor(
    public commonService: CommonService,
    private smsService: SmsService,
    private router: Router
  ) {}

  ngOnInit() {}
  sendOtp(mobileNumber) {
    this.messageSent = false;
    this.disableButtons = true;
    this.smsService.sendOtp(mobileNumber.value, true).subscribe(
      (res: any) => {
        this.messageSent = true;
        this.disableButtons = false;
      },
      (err: any) => {
        this.disableButtons = false;
        this.commonService.error = true;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
  verifyOtp(otp, mobileNumber) {
    this.disableButtons = true;
    this.smsService.verifyOtp(mobileNumber.value, otp.value).subscribe(
      (res: any) => {
        this.disableButtons = false;
        localStorage.forgetPasswordMobNo = mobileNumber.value;
        this.router.navigateByUrl("/reset-password");
      },
      (err: any) => {
        this.disableButtons = false;
        this.commonService.error = true;
        this.commonService.message = err.error.Message || err.error.message;
      }
    );
  }
}
