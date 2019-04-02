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
  public matchStatsJson:any;
  public strMatchDiv :string='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public myCommFun: CommfuncProvider
              ) 
  {
    this.intMatchID = navParams.get('matchID');
    //console.log(this.intMatchID);
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
        //console.log(result.response.items);
        loader.dismiss();
      })
    });
  }

  getMatchStatsByID(matchID) {
    let data: Observable<any>;
    let url = '';
    let matchStats = '';
    url = "https://rest.entitysport.com/soccer/matches/" + matchID + "/statsv2?token=" + this.myCommFun.tokenID;
    data = this.http.get(url);
       data.subscribe(data => {        
         this.matchStatsJson = data.response.items;
        //   console.log(result.response.items.match_info[0].teams.away["tname"]);
        //  console.log(result.response.items);
         matchStats = matchStats + '<table width="100%" >';
         matchStats = matchStats + '<tr>';
         matchStats = matchStats + '<td class="pull-right" ><div class="block"><div class="primaryCircle"><p>Home</p></div></div></td>';
         matchStats = matchStats + '<td class="text-left">&nbsp;&nbsp;<b>' + data.response.items.match_info[0].teams.home["tname"] + '</b></td>';

         matchStats = matchStats + '<td class="pull-right"><div class="block"><div class="dangerCircle"><p>Away</p></div></div></td>';
         matchStats = matchStats + '<td class="text-left" >&nbsp;&nbsp;<b>' + data.response.items.match_info[0].teams.away["tname"] + '</b></td>';
         matchStats = matchStats + '</tr>';
         matchStats = matchStats + '</table>';



        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">POSSESSION</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + data.response.items.statistics[2].home + '%">' + data.response.items.statistics[2].home + ' %</div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + data.response.items.statistics[2].away + '%">' + data.response.items.statistics[2].away + '%</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';


        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">SUBSTITUTIONS</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics[1].home, data.response.items.statistics[1].away) + '%">' + data.response.items.statistics[1].home + '</div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics[1].home, data.response.items.statistics[1].away) + '%">' + data.response.items.statistics[1].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';



        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">SHOTS ON TARGET</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics["shotsontarget"].home, data.response.items.statistics["shotsontarget"].away) + '%">' + data.response.items.statistics["shotsontarget"].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics["shotsontarget"].home, data.response.items.statistics["shotsontarget"].away) + '%">' + data.response.items.statistics["shotsontarget"].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">CORNERS</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics[5].home, data.response.items.statistics[5].away) + '%">' + data.response.items.statistics[5].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics[5].home, data.response.items.statistics[5].away) + '%">' + data.response.items.statistics[5].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">FOULS</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics["fouls"].home, data.response.items.statistics["fouls"].away) + '%">' + data.response.items.statistics["fouls"].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics["fouls"].home, data.response.items.statistics["fouls"].away) + '%">' + data.response.items.statistics["fouls"].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">OFFSIDES</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics[4].home, data.response.items.statistics[4].away) + '%">' + data.response.items.statistics[4].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics[4].home, data.response.items.statistics[4].away) + '%">' + data.response.items.statistics[4].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">YELLOW CARDS</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics[0].home, data.response.items.statistics[0].away) + '%">' + data.response.items.statistics[0].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics[0].home, data.response.items.statistics[0].away) + '%">' + data.response.items.statistics[0].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

        //  matchStats = matchStats + '<div class="progress-group">';
        //  matchStats = matchStats + '<h2 class="text-center">SAVES</h2>';
        //  matchStats = matchStats + '<div class="progress sm">';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width: ' + this.widthForHomeTeam(data.response.items.statistics["saves"].home, data.response.items.statistics["saves"].away) + '%">' + data.response.items.statistics["saves"].home + ' </div>';
        //  matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width: ' + this.widthForAwayTeam(data.response.items.statistics["saves"].home, data.response.items.statistics["saves"].away) + '%">' + data.response.items.statistics["saves"].away + '</div>';
        //  matchStats = matchStats + '</div>';
        //  matchStats = matchStats + '</div>';

         matchStats = matchStats + '<div class="progress-group">';
         matchStats = matchStats + '<h2 class="text-center">SAVES</h2>';
         matchStats = matchStats + '<div class="progress sm">';
         matchStats = matchStats + '<div class="progress-bar progress-bar-aqua" style="width:50%">' + data.response.items.statistics["saves"].home + ' </div>';
         matchStats = matchStats + '<div class="progress-bar progress-bar-danger" style="width:50%></div>';
         matchStats = matchStats + '</div>';
         matchStats = matchStats + '</div>';

         alert(matchStats);

         //document.getElementById('upAgreeValue').innerHTML = "ask";

         let myContainer = document.getElementById('stats') as HTMLInputElement;
         myContainer.innerHTML = "matchStats";

         //this.strMatchDiv = matchStats;
        //  var p1 = document.getElementById('p1'); 
        //   p1.innerText = "text ";

        //  document.getElementById('p1').innerHTML  = 'some';
         //document.getElementById('upAgreeValue').innerHTML = "&nbsp; " + data[0].count;
      });
 
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
