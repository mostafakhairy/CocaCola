import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { UsersRanks } from '../models/usersRanks';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  userRank = new UsersRanks();
  userFacebookRank = new UsersRanks();
  constructor(
    private userService: UserService,
    public commonService: CommonService
  ) {
    this.commonService.error = false;
    this.commonService.success = false;
  }

  async ngOnInit() {
    if (this.commonService.isFaceBook) {
      this.getFacebookFriendsRank();
    }
    await this.getRanks();
  }
  async getRanks() {
    try {
      this.userRank = await this.userService.getUserRanks().toPromise();
    } catch (err) {}
  }

  getFacebookFriendsRank() {
    this.commonService.loading = true;
    const fbId = window.atob(localStorage.fbId);
    this.userService
      .GetFaceBookUserRanks(fbId, localStorage.authToken)
      .subscribe(
        res => {
          this.userFacebookRank = res;
          this.commonService.loading = false;
        },
        err => {
          this.commonService.loading = false;
        }
      );
  }
}
