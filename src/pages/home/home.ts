import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DisplayNewsPage } from '../display-news/display-news';
import { ListPage } from '../list/list';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public jsonItems:any;
  public domainName : string; 
  connected: Subscription;
  disconnected: Subscription;
  public toastConnectedCount: number = 0;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public http : HttpClient,
              public loadingCtrl : LoadingController,
              public socialSharing : SocialSharing,
              public network:Network,
              public toast :ToastController
            
            ) { 
    //this.domainName = 'http://192.168.1.2/britAsiaNews/'
    this.domainName = "https://www.britishasianews.com/"
    this.checkNetwork()

    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.toastConnectedCount = 0;
      this.toast.create({
        message: 'Oops, your internet connection seems to be off',
        position: 'bottom',
        duration: 3000
      }).present();
    });

    this.connected = this.network.onConnect().subscribe(data => {
      this.toastConnectedCount++;
      if (this.toastConnectedCount < 2) {
        this.toast.create({
          message: 'Your are Online Now',
          position: 'bottom',
          duration: 3000
        }).present();
        this.loadData(); 
      }
    }); 

}
  

  checkNetwork() {
    var connectionStatus = navigator.onLine ? 'online' : 'offline';
    if (connectionStatus == "online") {
      this.loadData();  
    }
    else {
      this.toast.create({
        message: 'Oops, your internet connection seems to be off',
        position: 'bottom',
        duration: 3000
      }).present(); 
    }
  }

loadData(){
  let data:Observable<any>;
  //let url = 'http://britasianews.com/handlers/homePage.ashx';
  let url = this.domainName + 'handlers/homePage.ashx';

  let loader = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loader.present().then(()=>{
    data = this.http.get(url);
    data.subscribe(result =>{
      this.jsonItems = result;
      
      setInterval(() => {
        loader.dismiss();
      }, 3000);
      
    })
  });

  
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

listOfNewsByCatCode(strNewsCatCode : string,intNewsID:number,strNewsCatName:string){
  this.navCtrl.push(ListPage,{
    newsCatCode :  strNewsCatCode,
    newsID : intNewsID,
    newsCatName : strNewsCatName
  });
}

shareNews(newsTitle,newsID){
    let shareLink = "https://www.britishasianews.com/news/newsDisplay.aspx?newsID="+newsID;
   this.socialSharing.share(newsTitle, null, null, shareLink).then(() => {
       console.log('success');
   }).catch(()=>{
       console.log('error');
   });
}

}
