import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CricketScorecardPage } from './cricket-scorecard';

@NgModule({
  declarations: [
    CricketScorecardPage,
  ],
  imports: [
    IonicPageModule.forChild(CricketScorecardPage),
  ],
})
export class CricketScorecardPageModule {}
