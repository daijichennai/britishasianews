import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public tokenID: string = "";
  public domainName : string = "";
  chkDevicePushEnable: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient) {

    //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"
    if ((window.localStorage.getItem("token") == null) || (window.localStorage.getItem("token") == undefined)) {
      this.tokenID = "";
    }
    else{
      this.tokenID = window.localStorage.getItem("token");
    }

    this.chkDevicePushID();
  }
 chkDevicePushID(){
   //alert("ask")
   let chkDeviceIDURL = this.domainName + "handlers/addAndroidDeviceID.ashx?deviceMode=selectByDeviceID&deviceID=" + this.tokenID;
   this.http.post(chkDeviceIDURL, "").subscribe(
     data => {
       this.chkDevicePushEnable = data[0].devicePushEnabled;
     },
     error => {
       //alert("Error = " + error);
       //console.log(error);
     });
 }


 updateDeviceID(){
   let upDeviceID = this.domainName + "handlers/addAndroidDeviceID.ashx?deviceMode=update&deviceID=" + this.tokenID + "&devicePushEnable=" + this.chkDevicePushEnable;
   this.http.post(upDeviceID, "").subscribe(
     data => {
       //alert(data);
     },
     error => {
       //alert("Error = " + error.tostring);
       //console.log(error);
     });
 }

}
