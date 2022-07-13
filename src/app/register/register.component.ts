import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../appServices/auth.service';

import { RegisterUserRequest } from '../shared/interfaces/register-user.request';
import { User } from '../shared/interfaces/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  defaultImage!: string;


  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      preferredName: [''],
      jobTitle: [''],
      contactNumber: [''],
      emailAddress: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', Validators.required]
    })

  }

  get formControls():any {
    return this.registerForm.controls;
  }

  // method for submitting value by sign up api
  onSubmit() {
    console.table("submitesss", this.registerForm.value)
    if (this.registerForm.valid) {

      this.submitted = true;
      this.spinner.show();
      let req: RegisterUserRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        preferredName: this.registerForm.value.preferredName,
        jobTitle: this.registerForm.value.jobTitle,
        contactNumber: this.registerForm.value.contactNumber,
        emailAddress: this.registerForm.value.emailAddress,
        password: this.registerForm.value.password,
        profilePic: this.defaultImage
      }
      this.authService.registerUser(req).subscribe(result => {
        this.submitted = false;
        this.registerForm.reset();
        // this.toastr.success('User registered successfully!');
        console.log(result)
        alert("regiater sucessfully")
        this.spinner.hide();
        this.router.navigate(['/login'])
      },err=>{
        console.log(err)
        alert(err.errorMessage)
        this.spinner.hide();
      });
    }

  }

  public validate(): void {
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }
  }




}





