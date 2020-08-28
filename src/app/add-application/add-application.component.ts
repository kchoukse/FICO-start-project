import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApplicationService } from '../application.service';


@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  formGroup: FormGroup;
  date = new Date();  
  maxDate = (new Date().getFullYear()).toString()+"-0"+(new Date().getMonth()+1).toString()+"-"+(new Date().getDate()).toString();
  submitted = false;
  timeDiff = 0; 
  age = 0;
  currentPart = 0;
  objectToSend: any;
  decline:boolean = false;
  underAge:Boolean = false;
  underExperienced:Boolean = false;
  poor:Boolean = false;
  viewForm:Boolean = true;

  constructor(private formBuilder: FormBuilder, private applicationService:ApplicationService) {
    console.log(this.maxDate);
   }

    ngOnInit() {
      this.initializeNewForm();
    }

    initializeNewForm() {
      this.formGroup = this.formBuilder.group(
        { 
          "firstName": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "middleName": new FormControl('', Validators.maxLength(255)),
          "lastName": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "dateOfBirth": new FormControl('', Validators.required),
          "maritalStatus": new FormControl('', Validators.required),
          "ssnNumber": new FormControl('', Validators.required),
          "loanAmount": new FormControl('', [Validators.minLength(2),Validators.required]),
          "loanPurpose": new FormControl('', Validators.required),
          "description": new FormControl(''),
          "addressLine1": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "addressLine2": new FormControl(''),
          "city": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "state": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "postalCode": new FormControl('', [Validators.maxLength(5),Validators.minLength(5),Validators.required]),
          "homeNumber": new FormControl('', [Validators.maxLength(10),Validators.minLength(10),Validators.required]),
          "officeNumber": new FormControl('', [Validators.maxLength(10),Validators.minLength(10)]),
          "mobileNumber": new FormControl('', [Validators.maxLength(10),Validators.minLength(10),Validators.required]),
          "email" :   new FormControl('', [Validators.required, Validators.email]),
          "employerName": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "designation": new FormControl('', [Validators.maxLength(255)]),
          "annualSalary": new FormControl('', Validators.required),
          "workExYr": new FormControl('', Validators.required),
          "workExMonth": new FormControl('', Validators.required),
          "empAddressLine1": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "empAddressLine2": new FormControl(''),
          "empCity": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "empState": new FormControl('', [Validators.minLength(2), Validators.maxLength(255),Validators.required]),
          "empPostalCode": new FormControl('', [Validators.maxLength(5),Validators.minLength(5),Validators.required]),
          "status": new FormControl('0'),
          "dateOfSubmission": new FormControl(null)
        }
      );
    }
    getAge()
    {
      this.timeDiff = Math.abs(Date.now() - new Date(this.f.dateOfBirth.value).getTime());
      this.age = Math.floor((this.timeDiff / (1000 * 3600 * 24))/365.25);
      return this.age;
    }

    getWorkExInMonths()
    {
      return (this.f.workExYr.value*12) + this.f.workExMonth.value;
    }
    
    checkOthers()
    {
      if(this.f.loanPurpose.value == "Others")
        return true;
      else 
        return false;
    }
    get f() { return this.formGroup.controls; }

    onSubmit()
    { 
      this.submitted = true;
      this.poor = false;
      this.decline = false;
      this.underAge = false;
      this.underExperienced = false;
      
      if (this.formGroup.invalid) {
        return;
      }

      { //Conditions for Front End Decline
          if(this.getAge() < 18 || this.getAge() > 65){
              this.underAge = true;
              this.decline = true;
          }
          if(this.getWorkExInMonths() < 6) {
              this.underExperienced = true;
              this.decline = true;
          }
          if(this.f.annualSalary.value < 10000) {
              this.poor = true;
              this.decline = true;
          }
      }
      this.objectToSend = this.formGroup.value;
      console.log(this.objectToSend);
      
      this.applicationService.createApplicant(this.objectToSend)
        .subscribe(data => console.log(data), error => console.log(error));
      this.viewForm= false;
    }

    goToView()
    {
      this.applicationService.goToPage('view');
    }
      
}
