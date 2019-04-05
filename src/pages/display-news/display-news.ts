import { Component } from '@angular/core';
import {  NavController, NavParams ,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from "@ionic-native/social-sharing";
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@Component({
  selector: 'page-display-news',
  templateUrl: 'display-news.html',
})
export class DisplayNewsPage {
 
  public singleNewsData:any;
  public newsCommentsData:any;
  public intNewsID : number;
  public intNewsCategoryID  : number;
  public newsCategoryName : string ;
  public newsTitle :string;
  public agreeDisagreeResponse :any;
  public domainName :string = "";
  public myDate : Date = new Date();
  public hideShow: boolean = false;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public http : HttpClient,
              public socialSharing : SocialSharing,
              public loadingCtrl : LoadingController,
              public myCommFun: CommfuncProvider,
    ) {

    this.intNewsID = navParams.get('newsID');
    this.newsCategoryName = navParams.get('newsCategoryName');
    this.newsTitle = navParams.get('newsTitle');
    this.intNewsCategoryID = navParams.get('newsCatID');
    
    this.domainName = this.myCommFun.domainName 

    //alert(this.intNewsID);
    
    this.newsDisplayByID(this.intNewsID);
    this.displayEmailCommentsByNewsID(this.intNewsID);
 

  }

  newsDisplayByID(newsID:number) {
    let data:Observable<any>;
    
    let url = this.domainName + "handlers/newsMaster.ashx?newsMode=displayNews&newsID=" + newsID;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present().then(()=>{
    data = this.http.get(url);
    data.subscribe(result =>{
      this.singleNewsData = result;

      if (result[0].activecomments===0){
        this.hideShow = false;
      }else{
        this.hideShow = true;
      }

      loader.dismiss();
    })
  });
  }
 
  shareNews(){
    //alert(this.newsID);
    let shareLink = this.domainName + "news/newsDisplay.aspx?newsID=" + this.intNewsID;
    this.socialSharing.share(this.newsTitle, null, null, shareLink).then(() => {
        console.log('success');
    }).catch(()=>{
        console.log('error');
    });
  }


  displayEmailCommentsByNewsID(newsID:number){
    let newsComment:Observable<any>;
    
    let url = this.domainName + "handlers/androidEmailComments.ashx?mode=dispComment&newsID=" + newsID;
    newsComment = this.http.get(url);
    newsComment.subscribe(commentResult =>{
      this.newsCommentsData = commentResult;
    })
  }

  emailComment(){
    this.navCtrl.push('CommentsPage',{
      newsID :  this.intNewsID,
      newsCatID : this.intNewsCategoryID,
      newsTitle : this.newsTitle

    });

  }

  replyFn(replyReportAbuseMode : string,ecID : number){
    //alert(ecID);
    this.navCtrl.push('CommentsPage',{
      newsID :  this.intNewsID,
      newsCatID : this.intNewsCategoryID,
      newsTitle : this.newsTitle,
      ecID : ecID,
      replyMode : replyReportAbuseMode

    });
  }

  agreeDisAgreeFn(agreeMode, ecID){
    let agreeDisagreeURL =  this.domainName + "handlers/emailCommentsAgreeDisagree.ashx?ecID=" + ecID + "&agreeDisagree=" + agreeMode;  
    this.http.post(agreeDisagreeURL, "").subscribe(
            data => { 

              if(data[0].agreeMode ==="agree"){
                document.getElementById('upAgreeValue'+ecID).innerHTML = "&nbsp;" + data[0].count;
              }else if (data[0].agreeMode ==="disagree"){
                document.getElementById('upDisagreeValue'+ecID).innerHTML = "&nbsp;" + data[0].count;
              }
              //console.log(data[0].agreeMode);
              //console.log(data[0].count);
            },
            error => {
              console.log(error);
          });


  }


//   commentsLevel(ecDotsLevel){
//       if (ecDotsLevel === 0) {
//             return "ecDiv0";
//         }
//         else if (ecDotsLevel === 1) {
//           return "ecDiv1";
//         }
//         else if (ecDotsLevel === 2) {
//           return "ecDiv2";
//         }
//         else if (ecDotsLevel === 3) {
//           return "ecDiv3";
//         }
// }
  commentsLevel(ecDotsLevel){
      if (ecDotsLevel === 0) {
            return "comments-list1";
        }
        else if (ecDotsLevel === 1) {
          return "comments-list reply-list";
        }
        else if (ecDotsLevel === 2) {
          return "comments-list second-reply-list";
        }
        else if (ecDotsLevel === 3) {
          return "comments-list third-reply-list";
        }
}
  chkSubLvlBgColor(path) {
    if (path === 0) {
      return "grayColor";
    }
    else if (path === 1) {
      return "greenColor";
    }
    else if (path === 2) {
      return "violetColor";
    }
     else if (path === 3) {
      return "orangeColor";
    } 
  }

}
