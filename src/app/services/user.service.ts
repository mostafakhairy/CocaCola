import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { UserRegister } from '../models/userRegister';
import { UserLogin } from '../models/userLogin';
import { UserNotification } from '../models/userNotifications';
import { UsersRanks } from '../models/usersRanks';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  @Output() emitter: EventEmitter<number> = new EventEmitter();
  @Output() imgEmitter: EventEmitter<string> = new EventEmitter();
  @Output() userNameEmitter: EventEmitter<string> = new EventEmitter();


  constructor(private client: HttpClient) {
    super('/api/account', client);
  }
  register(userRegister: UserRegister) {
    return this.client.post(this.baseUrl + this.url + '/register', userRegister, this.getAuthHeader());
  }
  login(userLogin: UserLogin) {
    return this.client.post(this.baseUrl + this.url + '/login', userLogin, this.getAuthHeader());
  }
  setUserName(userName: string) {
    this.userNameEmitter.emit(userName)
  }
  ChangePassword(mobileNumber: string, newPassword: string) {
    return this.client.post(this.baseUrl + this.url + '/ChangePassword?mobileNumber='
    + mobileNumber + '&newPassword=' + newPassword, {},  this.getAuthHeader());
  }
  getUserCoins() {
    var result = this.client.get<number>(this.baseUrl + this.url + '/GetUserCoins',  this.getAuthHeader());
    result.subscribe(x => this.emitter.emit(x));
    return result;
  }
  setCoins(coins: number) {
    this.emitter.emit(coins);
  }
  getUserImg() {
    const img = this.client.get<string>(this.baseUrl + this.url + '/GetUserIMG', this.getAuthHeader());
    img.subscribe(x => this.imgEmitter.emit(x));
    return img;

  }
  getUserNotifications() {
    return this.client.get<UserNotification[]>(this.baseUrl + this.url + '/Notifications', this.getAuthHeader());
  }
  getUserRanks() {
    return this.client.get<UsersRanks>(this.baseUrl + this.url + '/GetUsersRank', this.getAuthHeader());

  }
  GetFaceBookUserRanks(userId: string, accessToken: string) {
     return this.client.get<UsersRanks>(this.baseUrl + this.url + '/GetFaceBookUserRanks?userId=' + userId +
      '&authToken=' + accessToken, this.getAuthHeader());
  }
  getNotificationCount () {
    return this.client.get<number>(this.baseUrl + this.url + '/NotificationsCount', this.getAuthHeader());
  }
  markNotificationAsRead () {
    return this.client.get<boolean>(this.baseUrl + this.url + '/MarkNotificationsAsRead', this.getAuthHeader());
  }
}
