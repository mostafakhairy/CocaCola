import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { PredictionsService } from '../services/predictions.service';
import { PreviousPrediction } from '../models/previousPrediction';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  previousPredictions: PreviousPrediction[] = [];
  constructor(public commonService: CommonService,
              private predictionService: PredictionsService) { }

  ngOnInit() {
    this.commonService.loading = true;
    this.predictionService.GetPreviousPredictions()
    .subscribe((predictions: PreviousPrediction []) => {
        this.previousPredictions = predictions;
        this.commonService.loading = false;
    }, err => {
      this.commonService.loading = false;
    });
  }

}
