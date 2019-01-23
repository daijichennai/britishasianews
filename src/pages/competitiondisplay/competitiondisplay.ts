import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
 
@IonicPage()
@Component({
  selector: 'page-competitiondisplay',
  templateUrl: 'competitiondisplay.html',
})
export class CompetitiondisplayPage {

  public scoreJson: any;
  public domainName: string = "";
  public competitionMode :string="";
  public toolBarName :string ="";
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
    
    this.competitionMode = navParams.get('competitionMode');
    this.toolBarName = this.getToolbarName(this.competitionMode);
  }

 


  ionViewDidLoad() {
    this.getScoresByMode(this.competitionMode);
  }

  getScoresByMode(competitionMode:string) {
    let mode ="";
    if (competitionMode === "championsLeague") {
      mode = "selectChampLeague"
    }
    else if (competitionMode === "premierLeague") {
      mode = "selectPremierLeague"
    }
    else if (competitionMode === "ipl") {
      mode = "selectIPL"
    }

    let data: Observable<any>;
    let url = this.domainName + "handlers/competitionMaster.ashx?mode=" + mode;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.scoreJson = result;
        loader.dismiss();
      })
    });
  }



  getToolbarName(mode) {
    if (mode === "championsLeague") {
      return "Champions League"
    }
    else if (mode === "premierLeague") {
      return "Premier League"
    }
    else if (mode === "ipl") {
      return "Indian Premier League"
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
