import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatchService } from '../services/match.service';
import { Match } from '../models/match';
import { UserPrediction } from '../models/userPrediction';
import { PredictionsService } from '../services/predictions.service';
import { AdminMatches } from '../models/adminMatches';

@Component({
  selector: 'app-admin-macthes',
  templateUrl: './admin-macthes.component.html',
  styleUrls: ['./admin-macthes.component.scss']
})
export class AdminMacthesComponent implements OnInit {

  matchesList: AdminMatches[];
  userPredictions = [];
  dateNow = new Date();
  constructor(public commonService: CommonService,
    private matchService: MatchService,
    private predictionService: PredictionsService) {
  }

  ngOnInit() {
    // debugger
    this.commonService.error = false;
    this.commonService.success = false;
    this.getMatches();

  }
  async getMatches() {

    this.matchService.getNotFinishedMatches().subscribe((matches: AdminMatches[]) => {
      this.matchesList = matches;
      console.log(this.matchesList);
      for (let index = 0; index < this.matchesList.length; index++) {
        let pred = new UserPrediction();
        pred.MatchId = this.matchesList[index].MacthId;
        pred.Team1Result = this.matchesList[index].Team1Result;
        pred.Team2Result = this.matchesList[index].Team2Result;
        this.userPredictions.push(pred);
      }
    });
  }
  submitPredictions() {
    this.commonService.error = false;
    this.commonService.success = false;
    this.setWinnerTeam();
    this.matchService.postMatchResults(this.matchesList).subscribe((res: any) => {
      this.commonService.success = true;
      this.commonService.message = res;
    }, err => {
      this.commonService.error = true;
      this.commonService.message = err.error.message || err.error.Message;
    })
  }
  isSameDate(date) {
    const currentDate = this.dateNow.setHours(0, 0, 0, 0);
    const matchDate = new Date(date).setHours(0, 0, 0, 0);
    return matchDate === currentDate;
  }
  setWinnerTeam() {
    for (let index = 0; index < this.matchesList.length; index++) {
      this.matchesList[index].WinnerTeamId = null;
      if (this.matchesList[index].Team1Result > this.matchesList[index].Team2Result) {
        this.matchesList[index].WinnerTeamId = this.matchesList[index].Team1ID;
      } else if (this.matchesList[index].Team1Result < this.matchesList[index].Team2Result) {
        this.matchesList[index].WinnerTeamId = this.matchesList[index].Team2ID;
      }
    }
  }
}
