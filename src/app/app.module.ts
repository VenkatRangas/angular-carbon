
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from './services/profile.service';
import { CarbonBarChartComponent } from './carbon-bar-chart/carbon-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    CarbonBarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'dashboard',component:DashboardComponent},
      {path:'',component:ProfileComponent},
      {path:'carbon',component:CarbonBarChartComponent},
     // {path:'**',redirectTo:'',pathMatch:'full'}
     ])
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
