import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VehicleserviceService } from '../vehicledetails/vehicleservice.service';
import { ProductserviceService } from './productservice.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.sass']
})
export class ProductdetailsComponent implements OnInit {

  productdetails=[];
  vehicledetails=[];
  vehicledetailscopy=[];
  vehicledescdetails=[];
  transportdetails=[];
  constructor(private fb: FormBuilder,private productservice: ProductserviceService,private vehicleservice:VehicleserviceService) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    
    setTimeout(() => {
      this.productservice.GetProductDetails(fetchvalues.userid).subscribe(data =>  {
        if(data){
          this.productdetails=data;
        }
      });
    }, 1200);
    this.Vehicleflag=false;
    this.fulldetailsflag=false;
    this.transportflag=false;
  }

  Vehicleflag:boolean=false;
  selectproductid:any;
  selectproductname:any;
  getAvailVehicles(productid:any,productname:any){
    this.Vehicleflag=true;
    this.selectproductid=productid;
    this.selectproductname=productname;
    this.productservice.GetAvailVehicleDetails().subscribe(data =>  {
      if(data){
        this.vehicledetails=data;this.vehicledetailscopy=data;
      }
    });
  }

  fulldetailsflag:boolean=false;
  fulldetails(vehicleid:any){
    this.fulldetailsflag=true;
    this.productservice.getVehicleDescriptiondetails(vehicleid).subscribe(data =>  {
      if(data){
        this.vehicledescdetails=data;
      }
    });
  }

  acceptvehicle(vehicleid:any,userid:any){
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    var frmdata={productid:this.selectproductid,productname:this.selectproductname,vehicleid:vehicleid, transportid:userid,
      manufname:fetchvalues.username,manufemail:fetchvalues.email,manufcontact:fetchvalues.mobileno}
    this.productservice.updateProductSatus(frmdata).subscribe(data =>  {
      if(data){
        alert("Updated SucessFully");
        this.ngOnInit();
      }
    });
  }

  transportflag:boolean=false;
  getpickedtransdetails(transportid:any){
    this.transportflag=true;
    this.vehicleservice.GetTransporterDetails(transportid).subscribe(data =>  {
      if(data){
       this.transportdetails=data[0];
      }
    });
  }

  //Filter Vehicles
  filtervehicle(event:any){
    if(event=='All'){
      //===0  starts with
      this.vehicledetails=this.vehicledetailscopy;
    }else{
      let srch = Object.assign([], this.vehicledetailscopy).filter(
        item => ((item.vehicletype.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
        this.vehicledetails=srch;
    }
  }


}
