import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FootballScoreCardPage } from './football-score-card';

@NgModule({
  declarations: [
    FootballScoreCardPage,
  ],
  imports: [
    IonicPageModule.forChild(FootballScoreCardPage),
  ],
})
export class FootballScoreCardPageModule {}
