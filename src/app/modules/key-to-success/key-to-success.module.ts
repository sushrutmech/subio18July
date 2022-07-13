import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyToSuccessRoutingModule } from './key-to-success-routing.module';
import { AssessmentComponent } from './assessment/assessment.component';
import { GoalComponent } from './goal/goal.component';
import { KeyToSuccessCComponent } from './key-to-success-c/key-to-success-c.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppImagePipe } from '../../shared/pipes/app-image-pipe';
import {ComponentsModule} from '../../shared/components/components.module'
import { AngularMaterialModule } from 'src/app/angularMaterialComponents/angular-material/angular-material.module';


@NgModule({
  declarations: [
    AssessmentComponent,
    GoalComponent,
    KeyToSuccessCComponent,
    AppImagePipe
  ],
  imports: [
    CommonModule,
    KeyToSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AngularMaterialModule
  ],
  exports:[
    KeyToSuccessCComponent,
    AssessmentComponent,
    GoalComponent,
    AppImagePipe

    

  ]
})
export class KeyToSuccessModule { }
