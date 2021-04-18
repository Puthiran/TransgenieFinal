import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserpagesserviceService } from '../userpagesservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  usersignupForm:FormGroup;
  countrylist:any=[];
  statelist:any=[];
  citylist:any=[];
  Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  name = "^$|^[A-Za-z ]+";
  number="^$|^[0-9]+";
  constructor(private fb: FormBuilder,private userservice: UserpagesserviceService, private router: Router) { }

  ngOnInit() {
    this.usersignupForm = this.fb.group({
      usertype: ['opt1',[]],
      username:['',[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email:['',[Validators.required, Validators.pattern(this.Email)]],
      mobileno:['',[Validators.required, Validators.pattern("[0-9]*")]],
      address:['',[Validators.required]],
      town:['',[Validators.required]],
      country:['opt1',[]],
      state:['opt1',[]],
      city:['opt1',[]],
      userstatus: [1,[]],
      imagetype:['image/png',[]],
      imagename:['sample.png',[]],
      imageurl:['my-uploads/sample.png',[]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]],
    });

    setTimeout(() => {
      this.userservice.GetCountryValues().subscribe(data =>  { this.countrylist=data;});
    }, 1200);
  }

  GetState(id:any){
    this.userservice.GetStateValues(id).subscribe(data =>  { this.statelist=data;});
  }

  GetCity(id:any){
    this.userservice.GetCityValues(id).subscribe(data =>  { this.citylist=data;});
  }

  signupvalidate(){
    let usertype=this.usersignupForm.value.usertype;
    let password=this.usersignupForm.value.password;
    let confirmpassword=this.usersignupForm.value.confirmpassword;
    if(usertype=='opt1'||usertype==''||usertype==null){
      alert("Select User type")
      return false;
    }else if(password!=confirmpassword){
      alert("Password & Confirm Password not Match")
      return false;
    }
    return true;
  }

  Signup(){
    let valflag=this.signupvalidate();
    if(valflag){
      this.userservice.UserSignup(this.usersignupForm.value).subscribe(data =>  { 
        if(data){
          alert("Registerd Successfully");
          setTimeout(() => {
            this.router.navigate(['/pages/login']);
          }, 1200);
         
        }
       });
    }
    
  }

}
