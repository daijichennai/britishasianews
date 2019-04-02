import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@IonicPage()
@Component({
  selector: 'page-cricket-scorecard',
  templateUrl: 'cricket-scorecard.html',
})
export class CricketScorecardPage {
  tabs: string ="scorecard";
  public intMatchID :number=0;
  public scoreCardJson:any;
  public commentaryJson:any;
  constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            public http: HttpClient,
            public loadingCtrl: LoadingController,
            public myCommFun: CommfuncProvider
            ) {
    this.intMatchID = navParams.get('matchID');
    console.log(this.intMatchID);
  }

  ionViewDidLoad() {
    //this.getScoreCardByID(this.intMatchID);
    this.getCommentaryByID(this.intMatchID,2);
  }

  getScoreCardByID(matchID) {
    let data: Observable<any>;
    let url = '';
    url = "https://rest.entitysport.com/v2/matches/" + matchID + "/scorecard?token=" + this.myCommFun.cricketTokenID;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        this.scoreCardJson = result.response.innings.reverse()
        console.log(result.response.innings.reverse());
        loader.dismiss();
      })
    });
  }

  getCommentaryByID(matchID,inningsNumer) {
    let data: Observable<any>;
    let url = '';
    url = "https://rest.entitysport.com/v2/matches/" + matchID + "/innings/" + inningsNumer + "/commentary?token=" + this.myCommFun.cricketTokenID;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        this.commentaryJson = result.response.commentaries.reverse();
        console.log(result.response.commentaries.reverse());
        loader.dismiss();
      })
    });
  }

  chkUndefined(ball, event, over) {
    if (event === 'overend') {
      return ""
    } else {
      return over + "." + ball;
    }
  }

 chkHowOut(chkOut, batsmanRun, batsmanBall) {
  if (typeof chkOut !== 'undefined') {
    return "<b style='color:#f44336;'>OUT! " + chkOut + " " + batsmanRun + " (" + batsmanBall + ")" + "</b>";
  } else {
    return "";
  }
}

  chkWicket(event, commentary) {
    if (event === 'wicket') {
      return "<b style='color:#f44336;' >" + commentary + "</b>"
    } else {
      return commentary;
    }
  }

}
