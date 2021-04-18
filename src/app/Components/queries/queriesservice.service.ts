import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueriesserviceService {
  

  baseUrl: string = environment.backendurl;
  constructor(private http:HttpClient) { }

  GetPostedProductDetails(userid:any) {
    return this.http.get(this.baseUrl+ '/getPostedProductdetails/'+userid).pipe(map((response: any) => response));
  }

  updateProductSatus(updata:any) {
    return this.http.post(this.baseUrl+ '/transportupdateproductstatus', updata).pipe(map((response: any) => response));
  }

  updateVehicleSatus(updata:any) {
    return this.http.post(this.baseUrl+ '/transportupdatevehiclestatus', updata).pipe(map((response: any) => response));
  }
  

}
