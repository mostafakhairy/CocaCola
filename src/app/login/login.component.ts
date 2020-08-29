import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { UserLogin } from '../models/userLogin';
import { FacebookLoginProvider, SocialUser, AuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user = new UserLogin(null, null, false, null, null, null, null, null);
  private subscription = new Subscription();
  constructor(public commonService: CommonService,
              private userService: UserService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    this.commonService.error = false;
    this.commonService.success = false;
  }
  signInWithFB(): void {
    this.subscription = this.authService.authState.subscribe((user: SocialUser) => {
      if (user) {
        const userLogin = new UserLogin(user.email, '', true, user.id, '',
         user.firstName, user.lastName, user.photoUrl, user.authToken);
        this.loginFb(userLogin);
      }
    });
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  loginFb(userLogin: UserLogin) {
    this.userService.login(userLogin).subscribe((res: any) => {
      this.handleSuccessResult(res);
      this.commonService.isFaceBook = userLogin.isFb;
      localStorage.isFaceBook = userLogin.isFb;
      if (userLogin.isFb) {
        localStorage.fbId = window.btoa(userLogin.fbId);
        localStorage.authToken = userLogin.authToken;
      }
    }, err => {
      console.log(err);

      if (err.error.errorCode === -96) {
        this.commonService.facebookUser = userLogin;
        localStorage.userLogin = JSON.stringify(userLogin);
        this.route.navigate(['/complete-register']);
      }
      // this.commonService.message = err.error.message || err.error.Message;
      // this.commonService.error = true;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  login() {
    this.userService.login(this.user).subscribe((res: any) => {
      this.handleSuccessResult(res);
    }, err => {
      this.commonService.message = err.error.message || err.error.Message;
      this.commonService.error = true;
      throw err;

    });
  }
  handleSuccessResult(res: any) {
    localStorage.setItem("userToken", res.token);
    localStorage.userNa = res.firstName;
    this.commonService.userName = res.firstName;
    this.userService.setCoins(res.coins);
    localStorage.photoUrl = res.userPhoto;
    if ( res.userPhoto !== null) {
      this.commonService.userPhoto =  res.userPhoto;

     }
    this.userService.setUserName(res.firstName);
    this.commonService.coins = res.coins;
    this.userService.getNotificationCount().subscribe(res => {
      this.commonService.notificationCount = res;
    });

    if (this.commonService.isAdmin()) {
      this.route.navigate(['/admin-matches']);
    } else {
      this.route.navigate(['/drink-win']);
    }
  }
}

