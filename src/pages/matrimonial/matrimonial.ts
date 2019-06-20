import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@IonicPage()
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
    public loadingCtrl: LoadingController,
    public myCommFun: CommfuncProvider,
  ) {

    this.domainName = this.myCommFun.domainName;
    this.gender = navParams.get('newsCatCode');
    this.getMatrimonialData(this.gender);
  }

  getMatrimonialData(gender: boolean) {
    let data: Observable<any>;
    //alert(lastNewsID);
    let url = this.domainName + "handlers/matrimonial.ashx?mode=list&matrimonialGender=" + gender;

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
    this.navCtrl.push("MatrimonialDisplayPage", {
      matrimonialID: intMatID
    });
  }

}
