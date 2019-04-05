import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { AlertController } from "ionic-angular";
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  public intNewsID: number;
  public intNewsCategoryID: number;
  public strNewsTitle: string;
  public ecID: number;
  public replyMode: string;  //reply or reportAbuse
  public userEmail: string;
  public userName: string;
  public userPlace: string;
  public userComments: string;
  public domainName: string = "";
  authForm: FormGroup;
  public parentID: number = 0;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public myCommFun: CommfuncProvider
    )
     {
    this.domainName = this.myCommFun.domainName;
    
    this.authForm = fb.group({
      'ecUserName': [null, Validators.compose([Validators.required])],
      'ecUserPlace': [null, Validators.compose([Validators.required])],
      'ecUserEmail': [null, Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      'ecComments': [null, Validators.compose([Validators.required])]
    });

    this.intNewsID = navParams.get('newsID');
    this.intNewsCategoryID = navParams.get('newsCatID');
    this.strNewsTitle = navParams.get('newsTitle');
    this.ecID = navParams.get('ecID');
    this.replyMode = navParams.get('replyMode');  //reply or reportAbuse
  
    if (this.replyMode === "reply" || this.replyMode === "reportAbuse") {
      this.parentID = this.ecID;
    } else {
      this.parentID = 0;
    }
  }

  ionViewDidLoad() {
    
  }

  insertComments() {
    let insCommentURL = ""
    if (this.replyMode == "reportAbuse") {
      insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insRptAbuse&ecID=" + this.ecID + " &ecUserName=" + this.userName + "&ecUserEmailID=" + this.userEmail + "&ecComments=" + this.userComments;
      } else {
      insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insComment&ecTitle=" + this.strNewsTitle + "&ecUserName=" + this.userName + "&ecUserEmailID=" + this.userEmail + "&ecComments=" + this.userComments + "&parentID=" + this.parentID + "&newsID=" + this.intNewsID + "&newsCategoryID=" + this.intNewsCategoryID + "&loginMode=email" +  "&ecUserPlace=" + this.userPlace;
      }

    //alert(this.userType);

    this.http.post(insCommentURL, "").subscribe(
      data => {
        console.log(data);
        //let msgFromDB = data[0].msg.split("|");
        //console.log(msgFromDB[0]);

        if (data[0].status === "success") {
          this.presentAlert()
          //alert("If your comment adheres to Britasianews.com's norms, it will be published within the next 36 hours.\n Thank You...");
          this.navCtrl.pop();
        }
        //console.log(data[0].status);
        //console.log(data[0].count);
      },
      error => {
        console.log(error);
      });

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'If your comment adheres to Britisahasianews.com norms, it will be published within the next 36 hours.\n Thank You...',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
