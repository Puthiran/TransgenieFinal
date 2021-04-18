import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserpagesserviceService } from 'src/app/Components/userpages/userpagesservice.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  imgURL:any="assets/images/user.png";
  constructor(private sanitizer: DomSanitizer, private userservice: UserpagesserviceService, public globals: ThemeOptions) {
  }

  profiledetails:any=[];
  private readonly imageType: any = 'data:image/*;base64,';
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
  }

}
