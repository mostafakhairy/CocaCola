import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AdminMatches } from '../models/adminMatches';
import { PredictionMatches } from '../models/predictionMatches';

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService {

  constructor(private Client: HttpClient) {
    super('/api/match/', Client);
  }

  getWeekMatches() {
    return this.Client.get<PredictionMatches>(this.baseUrl + this.url + 'GetWeekMatches' , this.getAuthHeader());
  }
  getNotFinishedMatches() {
    return this.Client.get<AdminMatches[]>(this.baseUrl + this.url + 'GetNotFinishedMatches', this.getAuthHeader());
  }
  postMatchResults(macthResults) {
    return this.Client.post(this.baseUrl + this.url + 'SaveMatchResults',
    macthResults, this.getAuthHeader());
  }
}
