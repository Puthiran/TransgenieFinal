import { Component, OnInit } from '@angular/core';
import { QueriesserviceService } from './queriesservice.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.sass']
})
export class QueriesComponent implements OnInit {
  productdetails=[];
  manuname:any;manuemail:any;manumobile:any;
  constructor(private queryservice:QueriesserviceService) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    
    setTimeout(() => {
      this.queryservice.GetPostedProductDetails(fetchvalues.userid).subscribe(data =>  {
        if(data){
          this.productdetails=data;
        }
      });
    }, 1200);

    this.manufactureflag=false;
  }

  manufactureflag:boolean=false;
  getmanufacturedetails(manufacdetails:any){
    this.manufactureflag=true;
    this.manuname=manufacdetails.username;
    this.manuemail=manufacdetails.email;
    this.manumobile=manufacdetails.mobileno;
  }

  updateproductstatus(productid:any,vehicleid:any,productstatus:any,vehiclestatus:any){
    var frmdata={productid:productid,vehicleid:vehicleid,productstatus:productstatus,availablestatus:vehiclestatus}
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
