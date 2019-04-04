import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@IonicPage()
@Component({
  selector: 'page-cricket-live',
  templateUrl: 'cricket-live.html',
})
export class CricketLivePage {

  tabs :string  = "recent";
  public recentJson: any;
  public upcomingJson: any;
  public liveJson: any;
  public isHideRecentMatch: boolean = false;
  public isHideUpcomingMatch: boolean = false;
  public isHideLiveMatch: boolean = false;

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient,
        public loadingCtrl: LoadingController,
        public myCommFun: CommfuncProvider
        ) {
  }

  ionViewDidLoad() {
     this.getMatches(2);   //Recent Matches
     this.getMatches(1);   //Upcoming Matches
     this.getMatches(3);   //Upcoming Matches
  }

  goToScoreCard(mID){
    this.navCtrl.push('CricketScorecardPage',{
      "matchID" :mID
    })
  }

  getMatches(status) {
    let data: Observable<any>;
    let url = '';

    url = "https://rest.entitysport.com/v2/matches/?status=" + status + "&token=" + this.myCommFun.cricketTokenID + "&paged=1&per_page=80";

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        if (status === 3) {
          if (result.response.items != 0) {
            this.liveJson = result.response.items;
          } else {
            this.isHideLiveMatch = true;
          }

        } else if (status === 1) {
          if (result.response.items != 0) {
            this.upcomingJson = result.response.items;
          } else {
            this.isHideUpcomingMatch = true;
          }

        } else if (status === 2) {
          if (result.response.items != 0) {
            this.recentJson = result.response.items;
          } else {
            this.isHideRecentMatch = true;
          }
        }

        console.log(result.response.items);

        loader.dismiss();
      },error =>{
        loader.dismiss();
      });
    });
  }

convertDate(dateValue) {
  var d = new Date(dateValue);
  var monthNames = ["Jan", "Feb", "Mar", "Apl", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var day = d.getDate();
  var monthIndex = d.getMonth();
  var year = d.getFullYear();
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

  iplLogo(teamName,teamLogo) {
    if (teamName === "Sunrisers Hyderabad") {
      return "http://www.daijiworld.in/images3/sunrisersHyderabad.png";
    } else if (teamName === "Rajasthan Royals") {
      return "http://www.daijiworld.in/images3/rajasthanRroyals.png";
    } else if (teamName === "Royal Challengers Bangalore") {
      return "http://www.daijiworld.in/images3/royalChallengers.png";
    } else if (teamName === "Kings XI Punjab") {
      return "http://www.daijiworld.in/images3/punjabKings.png";
    } else if (teamName === "Delhi Capitals") {
      return "http://www.daijiworld.in/images3/delhiDaredevils.jpg";
    } else if (teamName === "Kolkata Knight Riders") {
      return "http://www.daijiworld.in/images3/kolkataKnightRiders.png";
    } else if (teamName === "Mumbai Indians") {
      return "http://www.daijiworld.in/images3/mumbaiIndians.png";
    } else if (teamName === "Chennai Super Kings") {
      return "http://www.daijiworld.in/images3/csk.png";
    }else{
      return teamLogo;
    }
  }


}
