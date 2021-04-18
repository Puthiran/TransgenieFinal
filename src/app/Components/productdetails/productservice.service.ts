import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  

  baseUrl: string = environment.backendurl;
  constructor(private http:HttpClient) { }

  ProductRegister(pdata: any) {
    return this.http.post(this.baseUrl+ '/ProductRegister', pdata).pipe(map((response: any) => response));
  }

  GetProductDetails(userid: any) {
    return this.http.get(this.baseUrl+ '/getProductdetails/'+userid).pipe(map((response: any) => response));
  }

  GetAvailVehicleDetails() {
    return this.http.get(this.baseUrl+ '/getAvailVehicledetails').pipe(map((response: any) => response));
  }

  getVehicleDescriptiondetails(vehicleid: any) {
    return this.http.get(this.baseUrl+ '/getVehicleDescriptiondetails/'+vehicleid).pipe(map((response: any) => response));
  }

  updateProductSatus(updata:any) {
    return this.http.post(this.baseUrl+ '/updateproductstatus', updata).pipe(map((response: any) => response));
  }
  
  

}
