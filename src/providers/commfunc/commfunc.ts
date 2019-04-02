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

}
