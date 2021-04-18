import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserpagesserviceService } from '../userpagesservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userloginForm:FormGroup;
  Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb: FormBuilder,private userservice: UserpagesserviceService,private router: Router) { }

  ngOnInit() {
    this.userloginForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern(this.Email)]],
      password:['',[Validators.required]],
    })
  }

  userLogin(){
    let email=this.userloginForm.get('email').value;
    let password=this.userloginForm.get('password').value;
    this.userservice.GetUserLoginValues(email).subscribe(data =>  {
      if(data.length!==0){
        if(data[0].password==password){
          alert("LoginSuccessfull");
          sessionStorage.setItem('uservalues',JSON.stringify(data[0]));
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          },1800);
        }else{
          alert("Login Credentials Wrong");
        }
      }else{
        alert("Login Credentials Wrong");
      }
     },err=>{ console.log(err);alert("Login Credentials Wrong");});
  }


}
