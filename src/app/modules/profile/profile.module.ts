import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AngularMaterialModule } from 'src/app/angularMaterialComponents/angular-material/angular-material.module';
import { AdduserinfopopupComponent } from './adduserinfopopup/adduserinfopopup.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent,
    AdduserinfopopupComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    AngularMaterialModule
  ]
})
export class ProfileModule { }
