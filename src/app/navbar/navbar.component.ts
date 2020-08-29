import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  img: string;
  userName: string;
  isArabic = false;

  constructor(public commonService: CommonService,
   private router: Router, private userService: UserService) {
    this.commonService.userPhoto = localStorage.photoUrl === 'null' ? '../../assets/images/User.png' : localStorage.photoUrl ;
    }

  async ngOnInit() {
    this.subscribeToEmitt();
    if(this.commonService.isUserLogged()){
    this.commonService.coins = await this.userService.getUserCoins().toPromise();
    this.commonService.userName = localStorage.getItem("userNa");
  }
    if (this.commonService.isUserLogged()) {
      this.commonService.notificationCount = await this.userService.
      getNotificationCount().toPromise();
    }
  }

  signOut() {
    this.commonService.signOut();
  }
  subscribeToEmitt() {
    this.userService.emitter.subscribe((x: number) => this.commonService.coins = x);
    this.userService.userNameEmitter.subscribe((x: string) => this.commonService.userName = x)
  }
  changeLang(lang) {
    localStorage.lang = lang;
    this.commonService.lang = lang;
    this.commonService.useLanguage(lang === 'en-US' ? 'en' : 'ar');
    if (lang == 'ar-EG') {
      this.isArabic = true;
    } else {
      this.isArabic = false;
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "320px";
    document.getElementById("overlay3").style.width = "100%";
    document.getElementById("overlay3").style.opacity = "0.6";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay3").style.width = "0";
    document.getElementById("overlay3").style.opacity = "0";
  }
}

