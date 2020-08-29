import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SmsService extends BaseService{
  public baseUrl = environment.baseUrlConfig;
  apiUrl = '/api/sms';
  constructor(private Client: HttpClient) {
    super('/api/sms', Client);
  }
  sendOtp(mobileNumber: string, checkForNumber: boolean = false) {
    return this.Client.get(this.baseUrl + this.apiUrl + '/SendOtp?mobileNumber=' +
     mobileNumber + '&checkMobileNumber=' + checkForNumber , this.getAuthHeader());
  }
  verifyOtp(mobileNumber: string, otp: string) {
    return this.Client.get(this.baseUrl + this.apiUrl + '/VerifyOtp?mobileNumber=' +
    mobileNumber + '&otp=' + otp, this.getAuthHeader());
  }
}
