import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

 
@IonicPage()
@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
})
export class CurrencyPage {
  //public currencyJson: any;
  public domainName: string = "";

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController
    )
     {
    //this.domainName = "http://192.168.1.2/britAsiaNews/"
    this.domainName = "https://www.britishasianews.com/"
  }

  ionViewDidLoad() {
    this.getCurrencyExchangeData();
  }

  

  getCurrencyExchangeData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/currencyExchange.ashx";

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        document.getElementById('GBP_USD').innerHTML = result[0].GBP_USD;
        document.getElementById('GBP_EUR').innerHTML = result[0].GBP_EUR;
        document.getElementById('GBP_INR').innerHTML = result[0].GBP_INR;
        document.getElementById('GBP_PKR').innerHTML = result[0].GBP_PKR;
        document.getElementById('GBP_BDT').innerHTML = result[0].GBP_BDT;
        document.getElementById('GBP_LKR').innerHTML = result[0].GBP_LKR;
        document.getElementById('GBP_AUD').innerHTML = result[0].GBP_AUD;
        document.getElementById('GBP_CAD').innerHTML = result[0].GBP_CAD;
        document.getElementById('GBP_AED').innerHTML = result[0].GBP_AED;
        document.getElementById('GBP_XBT').innerHTML = result[0].GBP_XBT;
        document.getElementById('USD_EUR').innerHTML = result[0].USD_EUR;
        document.getElementById('USD_INR').innerHTML = result[0].USD_INR;
        document.getElementById('USD_PKR').innerHTML = result[0].USD_PKR;
        document.getElementById('USD_BDT').innerHTML = result[0].USD_BDT;
        document.getElementById('USD_LKR').innerHTML = result[0].USD_LKR;
        loader.dismiss();
      })
    });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
