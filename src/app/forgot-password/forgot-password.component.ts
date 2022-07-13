
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../appServices/auth.service'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userForm!: FormGroup;
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  
    private spinner: NgxSpinnerService, 
    private router: Router,
  ) { 
    
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get formControls():any {
    return this.userForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.spinner.show()
      this.authService.forgotPassword(this.formControls['email'].value).subscribe(result => {
        this.submitted = false;
        this.spinner.hide();
        this.userForm.reset();
        this.spinner.hide('forgot-password-form');
        
        //this.toastr.success(result);              
        this.router.navigate(['/login']);
       });
    }
  }



}
