import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

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
              public loadingCtrl: LoadingController,
              public myCommFun: CommfuncProvider
     ) 
     {
    
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
      url = "https://rest.entitysport.com/soccer/matches?status=" + status + "&token=" + this.myCommFun.tokenID + "&paged=1&per_page=" + perPage + "&order=asc&date=" + strDate;
    } else {
      url = "https://rest.entitysport.com/soccer/matches?status=" + status + "&token=" + this.myCommFun.tokenID + "&paged=1&per_page=" + perPage;
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
      },error =>{
        loader.dismiss();
      });
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

  goToScoreCard(mID) {
    //alert(matchID);
    this.navCtrl.push('FootballScoreCardPage', {
      "matchID": mID
    });
  }

  // getDateTimeHoursMin(myDate) {
  //   let matches = myDate.match(/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
  //   let monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  //   let year = parseInt(matches[3], 10);
  //   let month = parseInt(matches[2], 10) - 1; // months are 0-11
  //   let day = parseInt(matches[1], 10);
  //   let hours = parseInt(matches[4], 10)
  //   let minutes: any = parseInt(matches[5], 10)
  //   //alert(hours);
  //   let ampm = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return year + ' ' + monthNames[month] + ' ' + day + ' ' + strTime + ' (UK)';
  // }

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
