import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserpagesserviceService {
  
  baseUrl: string = environment.backendurl;
  constructor(private http: HttpClient) { }

  GetCountryValues() {
    return this.http.get(this.baseUrl+ '/getcountryvalues').pipe(map((response: any) => response));
  }

  GetStateValues(cid:any) {
    return this.http.get(this.baseUrl+ '/getstatevalues/'+cid).pipe(map((response: any) => response));
  }

  GetCityValues(sid:any) {
    return this.http.get(this.baseUrl+ '/getcityvalues/'+sid).pipe(map((response: any) => response));
  }

  UserSignup(value: any) {
    return this.http.post(this.baseUrl+ '/usersignup',value).pipe(map((response: any) => response));
  }

  GetUserLoginValues(email: any) {
    return this.http.get(this.baseUrl+ '/getuserloginvalues/'+email).pipe(map((response: any) => response));
  }

  ProfileUpdate(value: any) {
    return this.http.post(this.baseUrl+ '/updateprofile',value).pipe(map((response: any) => response));
  }

  updateimage(ephoto: any, userid: any) {
    return this.http.put(this.baseUrl+ '/profileimageupdate/'+userid,ephoto).pipe(map((response: any) => response));
  }

  getProfileImage(userid: any) {
    return this.http.get(this.baseUrl+ '/getprofileimage/'+userid).pipe(map((response: any) => response));
  }

}
