import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    profileData:any[]=[];

    getProfileData(data:any[]){
       this.profileData=data;
       
       
    }

  constructor() { }
}
