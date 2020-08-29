import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  SocialUser,
  AuthService,
  FacebookLoginProvider
} from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { RouterLink, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserLogin } from '../models/userLogin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  message = '';
  error = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router,
    public commonService: CommonService
  ) {}
  private subscription = new Subscription();
  ngOnInit() {
    this.commonService.loading = false;
  }
  signInWithFB(): void {
    this.subscription = this.authService.authState.subscribe(
      (user: SocialUser) => {
        console.log(user);
        if (user) {
          const userLogin = new UserLogin(
            user.email,
            '',
            true,
            user.id,
            '',
            user.firstName,
            user.lastName,
            user.photoUrl,
            user.authToken
          );
          this.login(userLogin);
        }
      }
    );
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  login(userLogin: UserLogin) {
    this.userService.login(userLogin).subscribe(
      (res: any) => {
        localStorage.setItem('userToken', res.token);
        localStorage.isFaceBook = userLogin.isFb;
        localStorage.photoUrl = res.userPhoto;
        if (res.userPhoto !== null) {
          this.commonService.userPhoto = res.userPhoto;
        }
        this.commonService.isFaceBook = userLogin.isFb;
        this.commonService.userName = res.firstName;
        if (userLogin.isFb) {
          localStorage.fbId = window.btoa(userLogin.fbId);
          localStorage.authToken = userLogin.authToken;
        }
        this.userService.setCoins(res.coins);
        this.userService.setUserName(res.firstName);
        this.commonService.coins = res.coins;
        localStorage.userNa = res.firstName;
        this.userService.getNotificationCount().subscribe(res => {
          this.commonService.notificationCount = res;
        });
        this.route.navigate(['/drink-win']);
      },
      err => {
        this.commonService.facebookUser = userLogin;
        localStorage.userLogin = JSON.stringify(userLogin);
        if (err.error.errorCode === -96) {
          localStorage.isFaceBook = userLogin.isFb;
          this.commonService.isFaceBook = userLogin.isFb;
          this.route.navigate(['/complete-register']);
        }
        this.message = err.error.message;
        this.error = true;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
