import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { UserLogin } from '../models/userLogin';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  @Output() languageEvent = new EventEmitter();
  public lang = localStorage.lang || 'en-US';
  public facebookUser: UserLogin;
  message = '';
  error = false;
  success = false;
  textDir = 'ltr';
  userName = '';
  coins = 0;
  loading = false;
  isArabic = false;
  isFaceBook = false;
  notificationCount = 0;
  userPhoto = '../../assets/images/User.png';
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private router: Router
  ) {
    if (this.isUserLogged()) {
      if (this.isTokenExpired()) {
        this.signOut();
      }
    }
    if (
      localStorage.userLogin &&
      (localStorage.userLogin !== null ||
        localStorage.userLogin !== 'undefined')
    ) {
      this.facebookUser = JSON.parse(localStorage.userLogin);
    }
    this.isFaceBook = localStorage.isFaceBook || false;
    this.useLanguage(this.lang === 'ar-EG' ? 'ar' : 'en');
  }

  isUserLogged() {
    return !!localStorage.getItem('userToken');
  }
  useLanguage(language: string) {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.isArabic = language === 'ar';
    this.languageEvent.emit('');
    this.translate.use(language);
  }
  isAdmin() {
    if (this.isUserLogged()) {
      const jwtHelper = new JwtHelperService();
      const tokenObject = jwtHelper.decodeToken(
        localStorage.getItem('userToken')
      );
      return tokenObject.IsAdmin === 'True';
    }
  }
  signOut() {
    console.log('session cleared');
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  getUserName() {
    debugger;
    if (this.isUserLogged()) {
      const jwtHelper = new JwtHelperService();
      const tokenObject = jwtHelper.decodeToken(
        localStorage.getItem('userToken')
      );
      return tokenObject.unique_name;
    }
  }
  getJwtToken() {
    if (this.isUserLogged()) {
      const jwtHelper = new JwtHelperService();
      return jwtHelper.decodeToken(localStorage.getItem('userToken'));
    }
  }
  getTokenString() {
    if (this.isUserLogged()) {
      const token = localStorage.getItem('userToken');
      return token;
    }
  }
  isTokenExpired() {
    if (this.isUserLogged()) {
      const jwtHelper = new JwtHelperService();
      return jwtHelper.isTokenExpired(localStorage.getItem('userToken'));
    }
  }
}
