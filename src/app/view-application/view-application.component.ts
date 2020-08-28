import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {

  applications:any;
  currIndex:any;
  hideTable:boolean = false;
  scores: object;
  scoreSize = 0;
  constructor(private applicationService:ApplicationService) { }

  ngOnInit() {
    
    this.applicationService.getApplications().subscribe(applications => {
      this.applications = applications;
    });

    this.applicationService.getScores().subscribe(scores => {
      this.scores = scores;
      for(var s in this.scores)
        this.scoreSize = this.scoreSize+1;
    });
  }
  getScore(ssnNumber)
  { 
    for(var i = 0; i < this.scoreSize; i++)
    {
      if(this.scores[i].ssnNumber == ssnNumber)
        return this.scores[i].score;
    } 
    
    return "Not Found";
  }
  getStatus(x)
  {
      if(x == 1)
        return "Approved";
      else if(x == -1)
        return "Declined";
      else 
        return "In progress";
  }

  openWindow(i)
  {
    this.currIndex = i;
    this.hideTable = true;
  }
  closeWindow(){
    this.currIndex = -1;
    this.hideTable = false;
  }
}
