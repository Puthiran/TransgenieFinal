import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QueriesserviceService } from '../queries/queriesservice.service';
import { VehicleserviceService } from './vehicleservice.service';

@Component({
  selector: 'app-vehicledetails',
  templateUrl: './vehicledetails.component.html',
  styleUrls: ['./vehicledetails.component.sass']
})
export class VehicledetailsComponent implements OnInit {
  vehicledetails=[];
  curproductdetails=[];
  constructor(private fb: FormBuilder,private vehicleservice: VehicleserviceService, private queryservice: QueriesserviceService) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    
    setTimeout(() => {
      this.vehicleservice.GetVehicleDetails(fetchvalues.userid).subscribe(data =>  {
        if(data){
          this.vehicledetails=data;
        }
      });
    }, 1200);
    this.productflag=false;
  }

  productflag:boolean=false;
  getRunningProductDetails(productid:any){
    this.productflag=true;
    this.vehicleservice.GetRunningProductDetails(productid).subscribe(data =>  {
      if(data){
        this.curproductdetails=data;
      }
    });
  }

  updateTrip(productid:any,vehicleid:any){
    var frmdata={productid:productid,vehicleid:vehicleid,productstatus:5,availablestatus:1}
    this.queryservice.updateProductSatus(frmdata).subscribe(data =>  {
      if(data){
        this.queryservice.updateVehicleSatus(frmdata).subscribe(data =>  {
          if(data){
            alert("Updated SucessFully");
            this.ngOnInit();
          }
        });
      }
    });
  }

}
