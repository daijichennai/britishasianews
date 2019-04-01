import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
 
@IonicPage()
@Component({
  selector: 'page-football-live',
  templateUrl: 'football-live.html',
})
export class FootballLivePage {
  tabs: string = "recentMatch";
  public recentJson: any;
  public upcomingJson: any;
  public liveJson: any;
  public isHideRecentMatch: boolean = false;
  public isHideUpcomingMatch: boolean = false;
  public isHideLiveMatch: boolean = false;

  public tokenID:string ="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController
     ) 
     {
    this.tokenID = '4c941ae9ec8529b5f7c8c83484acb6db';
  }

  ionViewDidLoad() {
    this.getMatches(2,20); //recent Match 
    this.getMatches(1, 20); //Upcoming Match 
    this.getMatches(3, 20); //Live Match 
  }

  getMatches(status, perPage) {
    let data: Observable<any>;
    let url ='';
    var fromDate = this.getMonthsDate(1);
    var toDate = this.getMonthsDate(2);
    var strDate = fromDate + "_" + toDate;
    
    if (status === 1) {
      url = "https://rest.entitysport.com/soccer/matches?status=" + status + "&token=" + this.tokenID + "&paged=1&per_page=" + perPage + "&order=asc&date=" + strDate;
    } else {
      url = "https://rest.entitysport.com/soccer/matches?status=" + status + "&token=" + this.tokenID + "&paged=1&per_page=" + perPage;
    } 
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {

          if (status === 3) {
            if (result.response.items != 0) {
              this.liveJson = result.response.items;
            }else{
              //alert('else');
              this.isHideLiveMatch = true;
            }
          } else if (status === 1) {
            if (result.response.items != 0) {
              this.upcomingJson = result.response.items;
            }else{
              this.isHideUpcomingMatch = true;
            }
            
          } else if (status === 2) {
            if (result.response.items != 0) {
            this.recentJson = result.response.items;
            }else{
              this.isHideRecentMatch = true;
            }
          }
           
        console.log(result.response.items);
         
        loader.dismiss();
      })
    });
  }


  getMonthsDate(month) {
    let today = new Date();
    let dd :any = today.getDate();
    let mm = today.getMonth() + month; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    //today = mm + '/' + dd + '/' + yyyy;
    return yyyy + '_' + mm + '_' + dd;
    //return today;
  }

  goToScoreCard(matchID) {
    alert(matchID);
    // this.navCtrl.push('ScorecardPage', {
    //   "matchID": matchID
    // });
  }

  segmentChanged(){
    // if (this.tabs === 'recentMatch') {
    //   alert('recentMatch');
    // } else if (this.tabs === 'upcomingMatch') {
    //   alert('upcomingMatch');
    // } else if (this.tabs === 'liveMatch') {
    //   alert('liveMatch');
    // }
  }

}
