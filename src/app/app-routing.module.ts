import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { StatusComponent } from './status/status.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: "view", component: ViewApplicationComponent },
  { path: "add" , component: AddApplicationComponent },
  { path: "home", component: HomeComponent },
  { path: "status", component: StatusComponent },
  { path: "", component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
  
}
