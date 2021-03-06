import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';
@IonicPage()
@Component({
  selector: 'page-matrimonial-display',
  templateUrl: 'matrimonial-display.html',
})
export class MatrimonialDisplayPage {

  public intMatID: number;
  public domainName: string = "";
  public matrimonialData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public myCommFun: CommfuncProvider,
  ) {

    this.intMatID = navParams.get('matrimonialID');
    this.domainName = this.myCommFun.domainName;


    this.dispMatrimonialByID(this.intMatID);
  }

  dispMatrimonialByID(matrimonialID: number) {
    let data: Observable<any>;

    let url = this.domainName + "handlers/matrimonial.ashx?mode=selectByID&matrimonialID=" + matrimonialID;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present().then(() => {
      data = this.http.get(url);
      data.subscribe(result => {
        this.matrimonialData = result;
        loader.dismiss();
      },error=>{
          loader.dismiss();
      });
    });
  }

}
