import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VehicleserviceService {
  
  
  baseUrl: string = environment.backendurl;
  constructor(private http:HttpClient) { }

  VehicleRegister(data: any) {
    return this.http.post(this.baseUrl+ '/VehicleRegister', data).pipe(map((response: any) => response));
  }

  VehicleDescriptionSave(data: string) {
    return this.http.post(this.baseUrl+ '/VehicleDescriptionSave', data).pipe(map((response: any) => response));
  }

  GetVehicleDetails(userid: any) {
    return this.http.get(this.baseUrl+ '/getVehicledetails/'+userid).pipe(map((response: any) => response));
  }

  GetTransporterDetails(userid:any) {
    return this.http.get(this.baseUrl+ '/gettransportdetails/'+userid).pipe(map((response: any) => response));
  }

  GetRunningProductDetails(productid:any) {
    return this.http.get(this.baseUrl+ '/getApprovedProductdetails/'+productid).pipe(map((response: any) => response));
  }
  

}
