import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommfuncProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommfuncProvider {

  public domainName: string = "https://www.britishasianews.com/";
  //public domainName: string = "http://192.168.1.2/britAsiaNews/";

  constructor(public http: HttpClient) {
    // console.log('Hello CommfuncProvider Provider');
  }

}
