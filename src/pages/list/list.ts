import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DisplayNewsPage } from '../display-news/display-news';
import { SocialSharing } from "@ionic-native/social-sharing";
import { CommfuncProvider } from '../../providers/commfunc/commfunc';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  public strNewsCatCode : string;
  public strNewsCatName : string;
  public listOfNews :any;
  public intLastNewsID :number;
  public listOfNewsInfinite : any;
  public domainName : string = "";

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http : HttpClient,
     public loadingCtrl : LoadingController,
     public socialSharing : SocialSharing,
    public myCommFun: CommfuncProvider) {
    //alert(navParams.)
    //alert(navParams.get('newsCatCode'));
    this.strNewsCatName = this.changeNewCatName(navParams.get('newsCatName'));
    this.strNewsCatCode = navParams.get('newsCatCode');
    let newsID = 0;
    
    this.domainName = this.myCommFun.domainName;
    if (navParams.get('newsID') == undefined){
      newsID = 0
    }else{
      newsID =  navParams.get('newsID')
    }

    //console.log( navParams.get('newsID'));

    this.displayNewsByCatCode(this.strNewsCatCode,newsID);

  }

  changeNewCatName(newsCatName : string){
    if(newsCatName == "UK"){
      return "United Kingdom";
    }else{
      return newsCatName ;
    }
  }

  getNewsID(intNewsID:number,strNewsCatName :string,strNewsTitle:string,intNewsCatID : number){
    //alert(intNewsID);
    this.navCtrl.push(DisplayNewsPage,{
      newsID :  intNewsID,
      newsTitle : strNewsTitle,
      newsCategoryName :  strNewsCatName,
      newsCatID : intNewsCatID
    });
  }

  displayNewsByCatCode(newsCategoryCode : string,lastNewsID : number) {
    let data:Observable<any>;    
    //alert(lastNewsID);
    let url = this.domainName +  "handlers/newsMaster.ashx?newsMode=infiniteScroll&newsCategoryCode=" + newsCategoryCode;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(()=>{
    data.subscribe(result =>{
      //console.log(result);
      this.listOfNews = result;
      let dataLength = this.listOfNews.length;
      this.intLastNewsID = this.listOfNews[dataLength - 1].newsID;
      //console.log("Last News ID : " + this.lastNewsID);
      loader.dismiss();
      })
    });
  }

  doInfinite(e): Promise<any> {
    //console.log('Begin async operation');
    let infinteData:Observable<any>;
    return new Promise((resolve) => {
      setTimeout(() => { 
        let infiniteURL = this.domainName +  "handlers/newsMaster.ashx?newsMode=infiniteScroll&newsCategoryCode=" + this.strNewsCatCode + "&lastNewsID=" + this.intLastNewsID;
        infinteData = this.http.get(infiniteURL);
        infinteData.subscribe(response=>{
          //console.log(response);
          this.listOfNewsInfinite = response;
          const newData = this.listOfNewsInfinite;
          this.intLastNewsID = this.listOfNewsInfinite[newData.length -1 ].newsID;
          for(let i = 0;i<newData.length;i++){
            this.listOfNews.push(newData[i]);
          } 
          e.complete();
        })
        //console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }

  shareNews(newsTitle, newsID) {
    let shareLink = "https://www.britishasianews.com/news/newsDisplay.aspx?newsID=" + newsID;
    this.socialSharing.share(newsTitle, null, null, shareLink).then(() => {
      console.log('success');
    }).catch(() => {
      console.log('error');
    });
  }

  // goToFootballLive(){
  //   this.navCtrl.push('FootballLivePage');
  // }

  // goToCricketLive(){
  //   this.navCtrl.push('CricketLivePage');
  // }

   
}
