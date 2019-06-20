import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';
//import { PropertyDisplayPage } from "../property-display/property-display";
@IonicPage()
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
               public loadingCtrl: LoadingController,
               public myCommFun: CommfuncProvider,
              ) {

    this.domainName = this.myCommFun.domainName;

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
      },error=>{
          loader.dismiss();
      });
    });
  }

  getPropertyID(intPropertyID: number) {
    this.navCtrl.push("PropertyDisplayPage", {
      propertyID: intPropertyID
    });
  }

}
