import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValues:any[]=[];
  

  constructor(private ps:ProfileService) { }

  ngOnInit() {
      console.log("profile service data",this.ps.profileData);
      this.formValues=this.ps.profileData;
      console.log(this.formValues);
    

      
  }

}
