import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PredictionsService extends BaseService {
  constructor(private client: HttpClient) {
    super("/api/prediction/", client);
  }
  GetPreviousPredictions() {
    return this.client.get(
      this.baseUrl + this.url + "GetPreviousUserPredictions",
      this.getAuthHeader()
    );
  }
  postUserPredictions(userPredictions) {
    console.log(userPredictions);
    return this.client.post(
      this.baseUrl + this.url + "PostUserPredictions",
      userPredictions,
      this.getAuthHeader()
    );
  }
}
