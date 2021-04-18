import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleserviceService } from '../vehicleservice.service';

@Component({
  selector: 'app-vehicleregister',
  templateUrl: './vehicleregister.component.html',
  styleUrls: ['./vehicleregister.component.sass']
})
export class VehicleregisterComponent implements OnInit {
  vehicleregisterForm:FormGroup;
  profiledetails:any;
  constructor(private fb: FormBuilder,private vehicleservice: VehicleserviceService) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    if(fetchvalues!==null||fetchvalues!==undefined||fetchvalues!==''){
      this.profiledetails=fetchvalues;
    }
    
    this.vehicleregisterForm = this.fb.group({
      vehiclename:['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      vehicletype: ['opt1',[]],
      vehicleno:['',[Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]],
      capacity:['',[Validators.required]],
      basicfare:['',[Validators.required, Validators.pattern("[0-9]*")]],
      vehiclestatus:[1,[]],
      availablestatus:[1,[]],
      userid: [this.profiledetails.userid,[]],
      vehicleDetails: this.fb.array([]),
    })
  }

  initformarray() {
    return this.fb.group({
      vehicleid: ['', []],
      description: ['', []],
      userid: [this.profiledetails.userid, []],
    });
  }

  insertnewrow() {
    this.initformarray();
    const control = <FormArray>this.vehicleregisterForm.controls['vehicleDetails'];
    control.push(this.initformarray());
  }

  removerow(indexid) {
    const control = <FormArray>this.vehicleregisterForm.controls['vehicleDetails'];
    control.removeAt(indexid);
  }

  vehiclevalidate(){
    let vehicletype=this.vehicleregisterForm.value.vehicletype;
    const vehiclearray = <FormArray>this.vehicleregisterForm.controls['vehicleDetails'];
    if(vehicletype=='opt1'||vehicletype==''||vehicletype==null){
      alert("Select Vehicle type")
      return false;
    }else if(vehiclearray.length<=0){
      alert("Enter Vehicle Description")
      return false;
    }
    return true;
  }

  onsubmit(){
    let valflag=this.vehiclevalidate();
    if(valflag){
      this.vehicleservice.VehicleRegister(this.vehicleregisterForm.value).subscribe(data =>  {
        if(data){
          const control = <FormArray>this.vehicleregisterForm.controls['vehicleDetails'];
          let setData=control.value;
          for(let i=0;i<control.length;i++){
            setData[i].vehicleid=data.insertId;
          }
          control.patchValue(setData);
          this.vehicleservice.VehicleDescriptionSave(this.vehicleregisterForm.value).subscribe(data =>  { 
           alert("Registerd SuccessFully");this.ngOnInit();
          });
        }
      });
    }
  }

}
