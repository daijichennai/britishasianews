import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CommfuncProvider } from '../../providers/commfunc/commfunc';

@IonicPage()
@Component({
  selector: 'page-competitiondisplay',
  templateUrl: 'competitiondisplay.html',
})
export class CompetitiondisplayPage {

  public scoreJson: any;
  public iplJson:any;
  public domainName: string = "";
  public competitionMode :string="";
  public toolBarName :string ="";
  public intCID : number=0;
  public isHideChampLeague:boolean =false;
  public isHideLeague:boolean = false;
  public strNewsCat :string ="";
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public myCommFun: CommfuncProvider
    )
     {
      this.domainName = this.myCommFun.domainName;
      this.intCID = navParams.get('cID');
      this.competitionMode = navParams.get('competitionMode');
      this.strNewsCat = navParams.get('newsCatCode');
      this.toolBarName = this.getToolbarName(this.competitionMode);
  }

  ionViewDidLoad() {

    if (this.strNewsCat ==="iplStandings"){
      this.toolBarName = "Indian Premier League";
      this.getIPLStandings();
    }else{
      this.getPointByID(this.intCID, this.competitionMode);
      //this.getPointByID(3, 'premierLeague');
    }
  }

  getPointByID(competitionID:number,comMode:string) {
    let data: Observable<any>;
    let url = "https://rest.entitysport.com/soccer/competition/" + competitionID + "/?token=" + this.myCommFun.tokenID;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {

        if (comMode === "championsLeague" || comMode === "europaLeague") {
          this.isHideChampLeague = true;
         // console.log('championsLeague');
          //console.log(result.response.items[0].point_table);
          this.scoreJson = result.response.items[0].point_table;
        } else {
          this.isHideLeague = true;
          //console.log(result.response.items[0].point_table[0].tables.total);
          this.scoreJson = result.response.items[0].point_table[0].tables.total;
        }
        loader.dismiss();        
      },
        error => {
          loader.dismiss();
        });
    });
  }

  getIPLStandings() {
    let data: Observable<any>;
    let url = "https://rest.entitysport.com/v2/competitions/112588/standings/?token=" + this.myCommFun.cricketTokenID;

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    data = this.http.get(url);
    loader.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.iplJson = result.response.standings[0].standings;
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
    });
  }


  getToolbarName(mode) {
    if (mode === "championsLeague") {
      return "UEFA Champions League"
    }else if (mode === "premierLeague") {
      return "Premier League"
    } else if (mode === "isl") {
      return "Indian Super League"
    } else if (mode === "europaLeague") {
      return "UEFA Europa League"
    } else if (mode === "ligue1") {
      return "Ligue 1"
    } else if (mode === "laLiga") {
      return "LaLiga 1"
    } else if (mode === "bundesliga") {
      return "Bundesliga"
    } else if (mode === "serieA") {
      return "Serie A"
    }
    
    else if (mode === "ipl") {
      return "Indian Premier League"
    }
  }

  iplLogo(teamName) {
    if (teamName === "Sunrisers Hyderabad") {
      return "http://www.daijiworld.in/images3/sunrisersHyderabad.png";
    } else if (teamName === "Rajasthan Royals") {
      return "http://www.daijiworld.in/images3/rajasthanRroyals.png";
    } else if (teamName === "Royal Challengers Bangalore") {
      return "http://www.daijiworld.in/images3/royalChallengers.png";
    } else if (teamName === "Kings XI Punjab") {
      return "http://www.daijiworld.in/images3/punjabKings.png";
    } else if (teamName === "Delhi Capitals") {
      return "http://www.daijiworld.in/images3/delhiDaredevils.jpg";
    } else if (teamName === "Kolkata Knight Riders") {
      return "http://www.daijiworld.in/images3/kolkataKnightRiders.png";
    } else if (teamName === "Mumbai Indians") {
      return "http://www.daijiworld.in/images3/mumbaiIndians.png";
    } else if (teamName === "Chennai Super Kings") {
      return "http://www.daijiworld.in/images3/csk.png";
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
