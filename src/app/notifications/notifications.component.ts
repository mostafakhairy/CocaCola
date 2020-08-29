import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserNotification } from '../models/userNotifications';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: UserNotification[];
  constructor(private userService: UserService, public commonService: CommonService) { }

  async ngOnInit() {
    try {
      this.notifications = await this.userService.getUserNotifications().toPromise();
      this.commonService.notificationCount = 0 ;
      let res = await this.userService.markNotificationAsRead().toPromise();
    } catch (error) {
      console.error(error)
    }
  }

}
