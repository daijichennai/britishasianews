import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController,Events ,App ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from "@ionic-native/network";
//import { MatrimonialPage } from "../pages/matrimonial/matrimonial";
import { Subscription } from '../../node_modules/rxjs/Subscription';
import { NetworkProvider } from '../providers/network/network';
import { Firebase } from '@ionic-native/firebase';
import { HttpClient } from '@angular/common/http';
import { DisplayNewsPage } from '../pages/display-news/display-news';
import { CommfuncProvider } from '../providers/commfunc/commfunc';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  toastInstance :any; 
  connected: Subscription;
  disconnected: Subscription;
  public toastConnectedCount: number = 0;
  public domainName:string="";
  pages: Array<{title: string, component: any,icon:any , newsCatCode : any}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public network : Network,
      public toast :ToastController,
      public networkProvider  : NetworkProvider,
      public events: Events,
      public app :App,
      public alertCtrl :AlertController,
      public http: HttpClient,
      public fireBase : Firebase,
      public myCommFun: CommfuncProvider
    ) {
    this.domainName = this.myCommFun.domainName;
    this.initializeApp();    
    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: 'HomePage',icon:'home' ,newsCatCode :'home' },
    //   { title: 'UK', component: "ListPage",icon:'globe' ,newsCatCode :'uk' },
    //   { title: 'India', component: "ListPage",icon:'globe' ,newsCatCode :'india'},
    //   { title: 'Pakistan', component: "ListPage",icon:'globe' ,newsCatCode :'pakistan' },
    //   { title: 'Bangladesh', component: "ListPage",icon:'globe' ,newsCatCode :'bangladesh' },
    //   { title: 'Sri Lanka', component: "ListPage",icon:'globe',newsCatCode :'srilanka'  },
    //   { title: 'World', component: "ListPage",icon:'globe' ,newsCatCode :'world'},
    //   { title: 'Special', component: "ListPage",icon:'globe' ,newsCatCode :'special'},
    //   { title: 'Exclusive', component: "ListPage", icon: 'checkmark-circle', newsCatCode: 'featured' },
    //   { title: 'Bollywood', component: "ListPage",icon:'globe'  ,newsCatCode :'bollywood'},
    //   { title: 'Sports - Football', component: "ListPage", icon: 'football', newsCatCode: 'football' },
    //   { title: 'Football - <b class="colorRed">Live</b>', component: 'FootballLivePage', icon: 'football', newsCatCode: 'football' },
    //   { title: 'Top Competitions', component: 'CompetitionPage', icon: 'trophy', newsCatCode: 'competition' },
    //   { title: 'Sports - Cricket', component: "ListPage", icon: 'globe', newsCatCode: 'cricket' },
    //   { title: 'Cricket - <b class="colorRed">Live</b>', component: 'CricketLivePage', icon: 'tennisball', newsCatCode: 'football' },
    //   { title: 'IPL Standings', component: 'CompetitiondisplayPage', icon: 'tennisball', newsCatCode: 'iplStandings' },
    //   { title: 'Sports - Others', component: "ListPage",icon:'globe' ,newsCatCode :'sports' },      
    //   { title: 'Community', component: "ListPage", icon: 'globe', newsCatCode:'community'},
    //   { title: 'Life Style', component: "ListPage", icon: 'globe', newsCatCode:'lifestyle'},
    //   { title: 'Food & Drink', component: "ListPage", icon: 'pizza', newsCatCode: 'foodDrink' },
    //   { title: 'Finance', component: "ListPage", icon: 'cash', newsCatCode: 'finance' },
    //  // { title: 'Currency', component: 'CurrencyPage', icon: 'cash', newsCatCode: 'currency' },
    //   { title: 'Technology', component: "ListPage", icon: 'calculator', newsCatCode: 'technology' },
    //   { title: 'Hollywood', component: "ListPage", icon: 'globe', newsCatCode:'entertain'},
    //   { title: 'Property', component: PropertyPage, icon: 'md-home', newsCatCode: '' }, 
    //   { title: 'SHAADI - BrideGroom', component: MatrimonialPage, icon: 'md-male', newsCatCode: 0 }, 
    //   { title: ' SHAADI - Bride', component: MatrimonialPage, icon: 'md-female', newsCatCode: 1 }, 
    //   { title: 'Settings', component: SettingsPage, icon: 'md-cog', newsCatCode: '' }, 
    //   //Here matrimonialGender is set as newsCatcode
    // ];
    this.getMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {     
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) { //Can we go back?
          nav.pop();
        } else {
          this.exitFunction();
        }
      });


      this.fireBase.getToken().then(token => {
        //alert('Token ID = ' + token);;
        this.pushDeviceID(token);     
        window.localStorage.setItem("token", token);
      }, err => {
        //alert("token Error = " + err)
      }); 
      
      this.fireBase.onNotificationOpen().subscribe(data => {
        // alert('News Title = ' + data.newsTitle)
        // alert('News ID = ' + data.newsID)
        // alert('NewsCategory ID = ' + data.newsCategoryID)
        // alert('NewsCategory code = ' + data.newsCategoryCode)
        this.pushNotificationRedirect(data.newsTitle,data.newsID,data.newsCategoryID,data.newsCategoryCode);
      }, err => console.log(err));
    });
  }

  getMenu() {
    let data:Observable<any>;
  //  let url = 'http://192.168.1.2/britAsiaNews/handlers/mobileMenu.ashx';
    let url = this.domainName + 'handlers/mobileMenu.ashx';

  
    data = this.http.get(url);
    data.subscribe(result =>{
      console.log("Menu");
      console.log(result);
      this.pages = result;      
    },error => {
      //alert("Error");
    });
  }

  exitFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit Britishasianews ?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }   
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component,{
      "newsCatName" :page.title,
      "newsCatCode" : page.newsCatCode
    });

  }

  pushNotificationRedirect(newsTitle,newsID,newsCategoryID,newsCategoryCode){
    // this.nav.setRoot(DisplayNewsPage,{
    //   "newsID" : newsID,
    //   "newsCategoryName" : newsCategoryCode,
    //   "newsCatID" : newsCategoryID,
    //   "newsTitle" : newsTitle
    // })
    this.nav.push(DisplayNewsPage, {
      "newsID": newsID,
      "newsCategoryName": newsCategoryCode,
      "newsCatID": newsCategoryID,
      "newsTitle": newsTitle
    })
  }

  pushDeviceID(tokenID){
    let insTokenURL = this.domainName +"handlers/addAndroidDeviceID.ashx?deviceMode=insert&deviceID=" + tokenID;
    this.http.post(insTokenURL, "").subscribe(
      data => {

        if (data[0].status === "success") {
          //alert(data[0].status);
        } 
        //console.log(data[0].status); 
      },
      error => {
        //alert("Error = " + error);
        //console.log(error);
      });
  }

   
  
}
