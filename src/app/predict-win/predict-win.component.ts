import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatchService } from '../services/match.service';
import { UserPrediction } from '../models/userPrediction';
import { PredictionsService } from '../services/predictions.service';
import { AdminMatches } from '../models/adminMatches';
import { PredictionMatches } from '../models/predictionMatches';
import { match } from 'minimatch';

@Component({
  selector: 'app-predict-win',
  templateUrl: './predict-win.component.html',
  styleUrls: ['./predict-win.component.scss']
})
export class PredictWinComponent implements OnInit {
  matchesList: AdminMatches[];
  predictionMatches: PredictionMatches;
  userPredictions = [];
  dateNow = new Date();
  showModal = true;
  userBettingCoins = 0;
  public percent: number;
  public options: any;
  constructor(
    public commonService: CommonService,
    private matchService: MatchService,
    private predictionService: PredictionsService
  ) {
    this.getMatches();
    this.percent = 0;
    this.options = {
      barColor: '#c60e18',
      trackColor: '#f2f2f2',
      scaleColor: 'false ',
      scaleLength: 0,
      lineCap: 'butt',
      lineWidth: 10,
      size: 140,
      rotate: 0,
      animate: {
        duration: 1000,
        enabled: true
      }
    };
  }

  ngOnInit() {
    // debugger
    this.commonService.error = false;
    this.commonService.success = false;
    this.reloadMatches();
  }
  getMatches() {
    this.commonService.loading = true;
    this.userPredictions = [];
    this.matchService.getWeekMatches().subscribe(
      matches => {
        if (matches !== null && matches !== undefined) {
          this.matchesList = matches.m_Item3;
          this.predictionMatches = matches;
          for (let index = 0; index < this.matchesList.length; index++) {
            const pred = new UserPrediction();
            pred.MatchId = this.matchesList[index].MacthId;
            pred.Team1Result = this.matchesList[index].Team1Result;
            pred.Team2Result = this.matchesList[index].Team2Result;
            pred.BettingCoins = this.matchesList[index].BettingCoins;
            this.userPredictions.push(pred);
          }
          this.calcCoins();
          this.commonService.loading = false;
        }
      },
      err => {
        this.commonService.loading = false;
      },
      () => {
        this.commonService.loading = false;
      }
    );
  }
  reloadMatches() {
    this.commonService.languageEvent.subscribe(res => {
      this.getMatches();
    });
  }
  submitPredictions() {
    this.commonService.error = false;
    this.commonService.success = false;
    this.setWinnerTeam();
    console.log(this.userPredictions);
    this.predictionService
      .postUserPredictions({ UserPredications: this.userPredictions })
      .subscribe(
        (res: any) => {
          this.commonService.success = true;
          this.commonService.message = res;
          this.openSuccess();
        },
        err => {
          this.commonService.error = true;
          this.commonService.message = err.error.message || err.error.Message;
          this.openSuccess();
        }
      );
  }
  isSameDate(date) {
    const currentDate = this.dateNow.setHours(0, 0, 0, 0);
    const matchDate = new Date(date).setHours(0, 0, 0, 0);
    return matchDate === currentDate;
  }
  setWinnerTeam() {
    for (let index = 0; index < this.userPredictions.length; index++) {
      this.userPredictions[index].WinnerTeamId = null;
      if (
        this.userPredictions[index].Team1Result >
        this.userPredictions[index].Team2Result
      ) {
        this.userPredictions[index].WinnerTeamId = this.matchesList[
          index
        ].Team1ID;
      } else if (
        this.userPredictions[index].Team1Result <
        this.userPredictions[index].Team2Result
      ) {
        this.userPredictions[index].WinnerTeamId = this.matchesList[
          index
        ].Team2ID;
      }
    }
  }
  openSuccess() {
    document.getElementById('successPopup').click();
  }
  calcCoins() {
    this.userBettingCoins = 0;
    this.userPredictions.forEach(c => {
      this.userBettingCoins += +c.BettingCoins;
    });
    this.percent = (this.userBettingCoins / this.commonService.coins) * 100;
  }
}
