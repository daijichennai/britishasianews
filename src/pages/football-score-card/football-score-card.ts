import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
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
  public isShow :boolean = false;
  public intMatchID: number;
  public matchJson: any;
  public commentaryJson :any;
  public homeLineUps:any;
  public awayLineUps: any;
  public referee: string="";
  public homeSubstitutes : any;
  public awaySubstitutes: any;
  public matchStatsJson :any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public myCommFun: CommfuncProvider,
              public menuCtrl: MenuController
              ) 
  {
    this.intMatchID = navParams.get('matchID');
    console.log(this.intMatchID);
    
    // 2367
  }

  ionViewDidLoad() {
    this.getMatchDatByID(this.intMatchID);
    this.getMatchStatsByID(this.intMatchID);

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
        this.referee = result.response.items.referee[0].fullname;
        loader.dismiss();
      },error =>{
        loader.dismiss();
      });
    });
  }

  getMatchStatsByID(matchID) {
    let data: Observable<any>;
    let url = '';
    url = "https://rest.entitysport.com/soccer/matches/" + matchID + "/statsv2?token=" + this.myCommFun.tokenID;
    data = this.http.get(url);
       data.subscribe(data => {
         this.matchStatsJson = data.response.items;
         this.isShow = true;
        //  console.log(data.response.items.match_info[0].teams.away["tname"]);
        //  console.log(data.response.items.statistics[0].home);
        //  console.log(data.response.items.statistics[0].away);
        //  console.log(data.response.items.statistics[0].name);         
        //  console.log(this.matchStatsJson.statistics[0]);
      });
 
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

widthForHomeTeam(home, away) {
  var total = (home + away);
  var homeWidth = (home / total) * 100;
  return homeWidth.toFixed(2);
}

widthForAwayTeam(home, away) {
  var total = (home + away);
  var awayWidth = (away / total) * 100;

  return awayWidth.toFixed(2);
}

 chkGoal(event) {
  if (event === 'goal') {
    return '<b color="secondary">Goal ! &#9917;</b>';
  } else {
    return '';
  }
}

}
