import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { PropertyDisplayPage } from "../property-display/property-display";

@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {

  
  public domainName: string = "";
  public listOfProperty: any;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public http: HttpClient,
               public loadingCtrl: LoadingController
              ) {

    //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"

    this.getPropertyData();

  }
 
  getPropertyData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/propertyMaster.ashx?mode=list";
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        //console.log(result);
        this.listOfProperty = result;
        loader.dismiss();
      })
    });
  }

  getPropertyID(intPropertyID: number) {
    this.navCtrl.push(PropertyDisplayPage, {
      propertyID: intPropertyID
    });
  }

}
