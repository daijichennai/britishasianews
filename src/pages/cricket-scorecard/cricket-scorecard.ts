import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
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
  public inningsNumber:string;
  public entireCommentaryJson:any;

  constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            public http: HttpClient,
            public loadingCtrl: LoadingController,
            public myCommFun: CommfuncProvider,
            public menuCtrl: MenuController

            ) {
    this.intMatchID = navParams.get('matchID');
    console.log(this.intMatchID);
  }

  ionViewDidLoad() {
    this.getScoreCardByID(this.intMatchID);
    //this.getScoreCardByID(40295);
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
        if (result.response.innings.reverse()[1].number){
          this.inningsNumber = result.response.innings.reverse()[1].number;
        }else if (result.response.innings.reverse()[0].number) {
          this.inningsNumber = result.response.innings.reverse()[0].number;
        }
        this.getCommentaryByID(matchID,this.inningsNumber); 
        this.scoreCardJson = result.response.innings;
        console.log(result.response.innings.reverse());
        loader.dismiss();
      },
      error=>{
        loader.dismiss();
      });
    });
  }

  getCommentaryByID(matchID, innings) {
    let data: Observable<any>;
    let url = '';
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    url = "https://rest.entitysport.com/v2/matches/" + matchID + "/innings/" + innings + "/commentary?token=" + this.myCommFun.cricketTokenID;
    data = this.http.get(url);  
    loader.present().then(() => {  
    data.subscribe(result => {
        //console.log(result.response.commentaries.reverse());
        this.entireCommentaryJson = result;
        this.commentaryJson = result.response.commentaries.reverse();
        loader.dismiss();
        
      },error =>{
        loader.dismiss();
        console.log('Error occured in Cricket Commentary');
      });    
    });
  }


  toggleMenu() {
    this.menuCtrl.toggle();
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
    return "<b class='colorRed' >OUT! " + chkOut + " " + batsmanRun + " (" + batsmanBall + ")" + "</b>";
  } else {
    return "";
  }
}

  convertUppercase(score) {
    if (score === "w") {
      return "<b class='colorRed'>W</b>"
    } else {
      return score;
    }
  }

  chkWicket(event, commentary) {
    if (event === 'wicket') {
      return "<b class='colorRed' >" + commentary + "</b>"
    } else {
      return commentary;
    }
  }

}
