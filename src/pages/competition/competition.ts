import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
 
@IonicPage()
@Component({
  selector: 'page-competition',
  templateUrl: 'competition.html',
})
export class CompetitionPage {
  public competitionJson: any;
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
    this.getCompetitionData();
  }

  goToCompetitionDisplay(competitionMode: string) {
    this.navCtrl.push('CompetitiondisplayPage', {
      "competitionMode": competitionMode
    })
  }

  getCompetitionData() {
    let data: Observable<any>;
    let url = this.domainName + "handlers/competitionMaster.ashx?mode=selectAll";

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.competitionJson = result;
        loader.dismiss();
      })
    });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }


}
