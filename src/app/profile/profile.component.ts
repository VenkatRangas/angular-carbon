import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
  ngOnInit() {
  }
  title = 'Carbon Components';
  formValues = [];
  constructor(private route:Router,private ps:ProfileService){}
  
  bussinessArrs = ['one','two', 'three','four'];
  subArrs = ['sone','stwo', 'sthree'];
  managerRoles = ['ONE', 'TWO', 'THREE'];
  Geo = ['Hyderabad','Mumbai','Kolkata','Pune','Delhi'];
  Market =['market1','market2','market3']
 


  getSelectedValue(event){
  this.formValues.push(event.target.value);
 
  }
  save(){
    if(this.formValues){
      this.ps.getProfileData(this.formValues);
      console.log(this.formValues);
      this.route.navigate(['/dashboard']); 

    }
   }

}
