import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MatrimonialDisplayPage } from "../matrimonial-display/matrimonial-display";
 

@Component({
  selector: 'page-matrimonial',
  templateUrl: 'matrimonial.html',
})
export class MatrimonialPage {

  public gender: boolean;
  public domainName: string = "";
  public listOfMatrimonial: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController
            ) {

          //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"
          this.gender = navParams.get('newsCatCode');
          this.getMatrimonialData(this.gender);
  }

  getMatrimonialData(gender:boolean) {
    let data: Observable<any>;
    //alert(lastNewsID);
    let url = this.domainName + "handlers/matrimonial.ashx?mode=list&matrimonialGender="+gender;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        //console.log(result);
        this.listOfMatrimonial = result;
        loader.dismiss();
      })
    });
  }

  getMatrimonialID(intMatID: number) {
    this.navCtrl.push(MatrimonialDisplayPage, {
      matrimonialID : intMatID
    });
  }
  
}
