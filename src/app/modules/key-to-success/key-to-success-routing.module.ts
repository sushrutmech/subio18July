import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { GoalComponent } from './goal/goal.component';
import { KeyToSuccessCComponent } from './key-to-success-c/key-to-success-c.component';

const routes: Routes = [
 
  // { path: "", redirectTo: '', pathMatch: "full" },
  {
    path: '',
    component: KeyToSuccessCComponent,
    data: { state: 'my-keys-to-success' }
    
  },
  
  {
    path: 'goal',
    component: GoalComponent,
    
  },

  {
    path: 'home/goal',
    component: GoalComponent,
    
  },

  {
    path: 'home/goal/:goal-id',
    component: GoalComponent,
    data: { state: 'goal:id' }
  },

  {
    path: 'goal/:goal-id',
    component: GoalComponent,
    data: { state: 'goal:id' }
  },

  {
    path: 'goal/:goal-id/assessment',
    component: AssessmentComponent,
    data: { state: 'assessment' }
  },

  {
    path: 'assessment',
    component: AssessmentComponent,
    
  },

  {
    path: 'home/goal/:goal-id/assessment',
    component: AssessmentComponent,
    data: { state: 'assessment' }
  },

  {
    path: 'home/assessment',
    component: AssessmentComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyToSuccessRoutingModule { }
