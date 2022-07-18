import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AssessmentComponent } from '../key-to-success/assessment/assessment.component';
import { GoalComponent } from '../key-to-success/goal/goal.component';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path: 'home',
    component:LayoutComponentComponent,
    data: { state: 'home' }
    
  },
  {
    path:"media/:contentType",
    component:WatchComponent
  }

 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
