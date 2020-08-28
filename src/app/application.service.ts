import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AddApplicationComponent } from './add-application/add-application.component';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  
  
  lHost:String = "http://localhost:8080/restdemo/appData/";


  constructor(private http:HttpClient) { }
 

  getApplications() {
    return this.http.get(this.lHost + "/get-app-list");
  }

  createApplicant(applicant: Object): Observable<Object> {
    return this.http.post(`${this.lHost}` + `add-app`, applicant);
    }
  
  getScores() {
    return this.http.get("http://localhost:8080/restdemo/appScore/get-score-list");
  }

  goToPage(arg0: string) {
    location.replace('view');
  }
}