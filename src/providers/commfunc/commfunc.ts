import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable()
export class CommfuncProvider {

  public cricketTokenID = 'be0e2fdd282afc3176c03d10cb601c09';
  public tokenID: string = '4c941ae9ec8529b5f7c8c83484acb6db';
  
  public domainName: string = "https://www.britishasianews.com/";
  //public domainName: string = "http://192.168.1.2/britAsiaNews/";


  constructor(public http: HttpClient) {
    
  }


  getDateTimeHoursMin(myDate) {
    let matches = myDate.match(/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
    let monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let year = parseInt(matches[3], 10);
    let month = parseInt(matches[2], 10) - 1; // months are 0-11
    let day = parseInt(matches[1], 10);
    let hours = parseInt(matches[4], 10)
    let minutes: any = parseInt(matches[5], 10)
    //alert(hours);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return year + ' ' + monthNames[month] + ' ' + day + ' ' + strTime + ' (UK)';
  }

}
