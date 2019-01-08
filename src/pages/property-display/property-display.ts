import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'page-property-display',
  templateUrl: 'property-display.html',
})
export class PropertyDisplayPage {

  public intProperty : number;
  public domainName: string = "";
  public propertyData: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient, 
              public loadingCtrl: LoadingController
            ) {
        
            this.intProperty = navParams.get('propertyID');
           //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"

            this.DisplayPropertyByID(this.intProperty);
      }

  DisplayPropertyByID(propertyID: number) {
    let data: Observable<any>;

    let url = this.domainName + "handlers/propertyMaster.ashx?mode=selectByID&propertyID=" + propertyID;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present().then(() => {
      data = this.http.get(url);
      data.subscribe(result => {
        this.propertyData = result;
        loader.dismiss();
      })
    });
  }

   
}
