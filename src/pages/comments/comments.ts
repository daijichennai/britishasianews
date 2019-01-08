import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators,AbstractControl,ValidatorFn } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { AlertController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';

 
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  authForm : FormGroup;
  public intNewsID : number;
  public intNewsCategoryID  : number;
  public strNewsTitle : string;
  public ecID :number;
  public replyMode : string;  //reply or reportAbuse
  public userEmail :string;
  public userName : string;
  public userPlace : string;
  public userComments : string;
  public userPassword : string;
  public userComfirmPwd :string;
  public confirmPassword: string;
  public lsEcUserName : string;
  public lsEcUserPlace : string;
  public lsEcUserEmail : string;
  public lsEcUserPwd :string;
  public hideShow :boolean = false;
  public hideShowConfirmPwd : boolean = false;
  public isChkLsEmail :boolean = false;
  public parentID :number=0;
  public domainName :string = "";
  public chkEmailData :any;
  public userType :string ="";

  public type = 'password';
  public showPass = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb : FormBuilder,
    public http : HttpClient,
    public alertCtrl : AlertController
    ) {
 
      //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"

      // localStorage.removeItem("ecUserName");
      // localStorage.removeItem("ecUserEmailID");
      // localStorage.removeItem("ecUserPassword");


      if((window.localStorage.getItem("ecUserEmailID") == null ) || (window.localStorage.getItem("ecUserEmailID") == undefined)){
        this.hideShow = !this.hideShow;
        this.isChkLsEmail = true;


      this.authForm = fb.group({
          'ecUserName' : [null, Validators.compose([Validators.required])],
          'ecUserPlace' : [null, Validators.compose([Validators.required])],
          'ecUserPassword': ['null', Validators.compose([Validators.required, Validators.minLength(8)])],          
          'ecConfirmpassword':['', Validators.compose([Validators.required,this.equalto('ecUserPassword')])],
          'ecUserEmail': ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
          'ecComments' : [null, Validators.compose([Validators.required])]
        })  


      }else{
        this.hideShow = this.hideShow;
        this.isChkLsEmail = false;


        this.authForm = fb.group({
          'ecUserName' : [null],
          'ecUserPlace': [null],
          'ecUserPassword':  [null],
          'ecUserEmail': [null],
          'ecComments' :  [null, Validators.compose([Validators.required])]
        })  

        this.lsEcUserEmail = window.localStorage.getItem("ecUserEmailID");
        this.lsEcUserName = window.localStorage.getItem("ecUserName");
        this.lsEcUserPlace = window.localStorage.getItem("ecUserPlace");
        this.lsEcUserPwd = window.localStorage.getItem("ecUserPassword");
        
      }


      this.intNewsID = navParams.get('newsID');
      this.intNewsCategoryID = navParams.get('newsCatID');
      this.strNewsTitle = navParams.get('newsTitle');
      this.ecID = navParams.get('ecID');
      this.replyMode = navParams.get('replyMode');  //reply or reportAbuse

      //alert(this.replyMode);

      if(this.replyMode =="reply" || this.replyMode == "reportAbuse"){
        this.parentID = this.ecID;
      }else{
        this.parentID = 0;
      }

      //alert("local Storage = " + window.localStorage.getItem("ecUserEmailID"));
 
  }

  // submitForm(value: any):void{
	// 	console.log('Form submited!')
	// 	console.log(value);
  // }	
  
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
    }


    presentAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'If your are new user,please verify your EmailID or else ignore it.\n If your comment adheres to Britasianews.com norms, it will be published within the next 36 hours.\n Thank You...',
        buttons: ['Dismiss']
      });
      alert.present();
    }

  insertComments(){ 
      let insCommentURL = ""
      if((this.isChkLsEmail)){
        //alert("else -> news user")
        window.localStorage.setItem("ecUserName", this.userName);
        window.localStorage.setItem("ecUserPlace", this.userPlace);
        window.localStorage.setItem("ecUserEmailID", this.userEmail);
        window.localStorage.setItem("ecUserPassword", this.userPassword);

        if(this.replyMode=="reportAbuse"){
          insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insRptAbuse&ecID=" + this.ecID + " &ecUserName=" + this.userName + "&ecUserEmailID=" + this.userEmail + "&ecComments=" + this.userComments;
        }else{
          insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insComment&ecTitle=" + this.strNewsTitle + "&ecUserName=" + this.userName + "&ecUserEmailID=" + this.userEmail + "&ecComments=" + this.userComments + "&parentID=" + this.parentID + "&newsID=" + this.intNewsID + "&newsCategoryID=" + this.intNewsCategoryID + "&ecUserPassword=" + this.userPassword + "&loginMode=email" + "&userType=" + this.userType + "&ecUserPlace=" + this.userPlace;
        }
     
      }
      
      else{
      //alert("if -> old user");

        if(this.replyMode=="reportAbuse"){
          insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insRptAbuse&ecID=" + this.ecID + " &ecUserName=" + this.lsEcUserName + "&ecUserEmailID=" + this.lsEcUserEmail + "&ecComments=" + this.userComments;
        }else{
          insCommentURL = this.domainName + "handlers/androidEmailComments.ashx?mode=insComment&ecTitle=" + this.strNewsTitle + "&ecUserName=" + this.lsEcUserName + "&ecUserEmailID=" + this.lsEcUserEmail + "&ecComments=" + this.userComments + "&parentID=" + this.parentID + "&newsID=" + this.intNewsID + "&newsCategoryID=" + this.intNewsCategoryID + "&ecUserPassword=" + this.lsEcUserPwd + "&loginMode=email" + "&userType=" + this.userType + "&ecUserPlace=" + this.lsEcUserPlace;
        
        }
      }

      //alert(this.userType);
     
     this.http.post(insCommentURL,"").subscribe(
             data => { 
              console.log(data);
              let msgFromDB =  data[0].msg.split("|");
              //console.log(msgFromDB[0]);

                if(msgFromDB[0]=="incorrectPassword"){
                  alert("Incorrect Password...");
                }else{

                  if (data[0].status ==="success"){
                    this.presentAlert()
                    //alert("If your comment adheres to Britasianews.com's norms, it will be published within the next 36 hours.\n Thank You...");
                    this.navCtrl.pop();
                  }

                } 
               //console.log(data[0].status);
               //console.log(data[0].count);
             },
             error => {
               console.log(error);
           });

    }

    chkEmailAvailability(){
      let chkEmailID:Observable<any>;
      let ecUserEmailID = this.userEmail;
      //alert(ecUserEmailID);
      let chkURL = this.domainName + "handlers/chkUserDetails.ashx?mode=chkEmail&ecUserEmailID=" + ecUserEmailID
      chkEmailID = this.http.get(chkURL);
      chkEmailID.subscribe(result =>{
        //console.log(result[0].isAvaiable);
        if(result[0].isAvaiable){
          //New User
          //alert("news User")
          this.userType = "newsUser"
          this.hideShowConfirmPwd = true ;
        }else{
          //Existing User
          //alert("old User")
          this.userType = "existingUser"
          this.hideShowConfirmPwd = false;
        }

      });
    }

    showPassword() {
      this.showPass = !this.showPass;
   
      if(this.showPass){
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    }

}
