import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})


export class CouponsService extends BaseService {

    constructor(private client: HttpClient) {
        super('/api/Coupon', client);
    }
    burnCoupon(couponNumber: string) {
        return this.client.get<number>(this.baseUrl + this.url + '/Burn?couponNumber=' + couponNumber, this.getAuthHeader());
    }

}
