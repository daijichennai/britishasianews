import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';
@IonicPage()
@Component({
  selector: 'page-football-score-card',
  templateUrl: 'football-score-card.html',
})
export class FootballScoreCardPage {
  
  tabs: string = "lineUps";
  public intMatchID: number;
  public matchJson: any;
  public commentaryJson :any;
  public homeLineUps:any;
  public awayLineUps: any;

  public homeSubstitutes : any;
  public awaySubstitutes: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public myCommFun: CommfuncProvider
              ) 
  {
    this.intMatchID = navParams.get('matchID');
    console.log(this.intMatchID);
    // 2367
  }

  ionViewDidLoad() {
    this.getMatchDatByID(this.intMatchID);
  }


  getMatchDatByID(matchID) {
    let data: Observable<any>;
    let url = '';
    url = "https://rest.entitysport.com/soccer/matches/" + matchID + "/info?token=" + this.myCommFun.tokenID;
    
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {        
        this.matchJson = result.response.items.match_info;        
        this.homeLineUps = result.response.items.lineup.home.lineup.player;
        this.awayLineUps = result.response.items.lineup.away.lineup.player;
        this.homeSubstitutes = result.response.items.lineup.home.substitutes;
        this.awaySubstitutes = result.response.items.lineup.away.substitutes;
        this.commentaryJson = result.response.items.commentary.reverse();
        console.log(result.response.items);
        loader.dismiss();
      })
    });
  }

 chkGoal(event) {
  if (event === 'goal') {
    return '<b color="secondary">Goal ! &#9917;</b>';
  } else {
    return '';
  }
}

}
