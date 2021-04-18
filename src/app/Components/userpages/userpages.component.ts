import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserpagesserviceService } from './userpagesservice.service';

@Component({
  selector: 'app-userpages',
  templateUrl: './userpages.component.html',
  providers:[]
})


export class UserpagesComponent implements OnInit {
  imgURL:any="assets/images/user.png";
  updateimgURL:any="assets/images/user.png";
  profiledetails:any;
  editprofileForm:FormGroup;
  constructor(private fb: FormBuilder,private userservice: UserpagesserviceService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
    if(fetchvalues!==null||fetchvalues!==undefined||fetchvalues!==''){
      this.profiledetails=fetchvalues;
    }

    setTimeout(() => {
      this.userservice.getProfileImage(this.profiledetails.userid).subscribe(data =>  { 
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data);
      });
    },1300);

    this.editprofileForm = this.fb.group({
      username:['',[]],
      mobileno:['',[]],
      address:['',[]],
      town:['',[]],
      userid:['',[]]
    });
  }

  editflag:boolean=false;
  editopen(){
    this.editflag=!this.editflag;
    if(this.editflag){
      this.editprofileForm.get('username').setValue(this.profiledetails.username);
      this.editprofileForm.get('mobileno').setValue(this.profiledetails.mobileno);
      this.editprofileForm.get('address').setValue(this.profiledetails.address);
      this.editprofileForm.get('town').setValue(this.profiledetails.town);
      this.editprofileForm.get('userid').setValue(this.profiledetails.userid);
    }
    this.userservice.getProfileImage(this.profiledetails.userid).subscribe(data =>  { 
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data);
    });
  }

  ProfileUpdate(){
    this.userservice.ProfileUpdate(this.editprofileForm.value).subscribe(data =>  {
      if(data){
        this.userservice.GetUserLoginValues(this.profiledetails.email).subscribe(data =>  {
          if(data){
            sessionStorage.setItem('uservalues',JSON.stringify(data[0]));
              setTimeout(()=>{
                this.editflag=false;
                alert("Updated Successfully");
                let fetchvalues=JSON.parse(sessionStorage.getItem('uservalues'));
                if(fetchvalues!==null||fetchvalues!==undefined||fetchvalues!==''){
                  this.profiledetails=fetchvalues;
                }
              },1000);
          }
         });
      }
    });
  }

  //Image Process
  imageUpdateShow:boolean=false;
  openimagepop(){
    this.imageUpdateShow=true;
    //$("#imagefile").click();
  }

  private readonly imageType: any = 'data:image/*;base64,';
  imagepopclose(){
    this.imageUpdateShow=false;
    // this.userservice.getProfileImage(this.profiledetails.userid).subscribe(data =>  { 
    //   this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data);
    // });
  }

  ephoto:any;
  PhotoUpload(event: any) {
   // when the load event is fired and the file not empty
   if(event.target.files && event.target.files.length > 0) {
      //Check & Print Type Error Message
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
          alert("Only images are supported!..");
         return;
      }
     if (event.target.files[0].size < 500000) {
  
     // Fill file variable with the file content
    //  this.saveimgprocess=true;
    //  this.showimage=true;
   
     // Instantiate an object to read the file content
     let reader = new FileReader();

     //To read Encrypted file and send url to display in html
     reader.readAsDataURL(event.target.files[0]); 
       reader.onload = (_event) => { 
         this.updateimgURL = reader.result; 
       }

    // Instantiate a FormData to store form fields and encode the file
    this.ephoto = new FormData();
    // Add file content to prepare the request
    this.ephoto.append("file", event.target.files[0]); 
   }
   else{
     alert("Max Image Size 500KB Only & Check File Format");
   }
  }
  
  }

  PhotoUpdate(){

    // Launch post request Service Call
    this.userservice.updateimage(this.ephoto,this.profiledetails.userid).subscribe((data) => {
      //Employee image  notification start
      if(data.message=='true'){
        //this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'EMPLOYEE IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
       // (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        this.updateimgURL="assets/images/user.png";
        this.imageUpdateShow=false;
        setTimeout(() => {
          this.ngOnInit();
          //this.router.navigate(['Employee/ViewEmployee']);
        },1200);    
      }
      else{
        //this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'EMPLOYEE IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     //Employee image  notification end
    });

  }

}

