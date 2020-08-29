import { Component, OnInit } from '@angular/core';
import { CouponsService } from '../services/coupons.Service';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-drink-win',
  templateUrl: './drink-win.component.html',
  styleUrls: ['./drink-win.component.scss']
})
export class DrinkWinComponent implements OnInit {
  isBurend: boolean = false
  winCoins: number
  param:{}
  constructor(private couponsService: CouponsService, public commonService: CommonService, private userService: UserService) {
    this.commonService.error = false;
    this.commonService.success = false;
  }

  ngOnInit() {
    this.newCode();
  }
  changeTab() {
    this.commonService.error = false;
    this.commonService.success = false;
  }
  async burnCoupon(codeNum: string) {
    try {
      this.commonService.error = false;
      var sucsec = await this.couponsService.burnCoupon(codeNum).toPromise();
      console.log(sucsec);
      this.commonService.success = true;
      this.isBurend = true;
      this.winCoins = sucsec;
      this.param={value:sucsec}
      this.userService.getUserCoins();
    }
    catch (ex) {
      this.commonService.error = true;
      this.commonService.message = ex.error.Message;
    }

  }
  newCode() {
    this.winCoins = 0;
    this.isBurend = false
    this.commonService.success = false;
    this.commonService.error = false;

  }

}
