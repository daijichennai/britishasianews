import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CricketLivePage } from './cricket-live';

@NgModule({
  declarations: [
    CricketLivePage,
  ],
  imports: [
    IonicPageModule.forChild(CricketLivePage),
  ],
})
export class CricketLivePageModule {}
