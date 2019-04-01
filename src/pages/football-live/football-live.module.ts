import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FootballLivePage } from './football-live';

@NgModule({
  declarations: [
    FootballLivePage,
  ],
  imports: [
    IonicPageModule.forChild(FootballLivePage),
  ],
})
export class FootballLivePageModule {}
