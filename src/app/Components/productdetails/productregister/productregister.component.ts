import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-productregister',
  templateUrl: './productregister.component.html',
  styleUrls: ['./productregister.component.sass']
})
export class ProductregisterComponent implements OnInit {
  producteregisterForm:FormGroup;
  profiledetails:any;
  constructor(private fb: FormBuilder, private productservice: ProductserviceService) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    if(fetchvalues!==null||fetchvalues!==undefined||fetchvalues!==''){
      this.profiledetails=fetchvalues;
    }
    
    this.producteregisterForm = this.fb.group({
      productname:['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      producttype: ['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      weight:['',[Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]],
      productstatus:[1,[]],
      remarks:['',[]],
      source:['',[Validators.required]],
      destination:['',[Validators.required]],
      userid: [this.profiledetails.userid,[]],
      //productDetails: this.fb.array([]),
    })
  }

  onsubmit(){
    this.productservice.ProductRegister(this.producteregisterForm.value).subscribe(data =>  {
      if(data){
        alert("Registered SucessFully");this.ngOnInit();
      }
    });
  }

}
