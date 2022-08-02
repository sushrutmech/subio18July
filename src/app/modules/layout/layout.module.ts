import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AngularMaterialModule } from 'src/app/angularMaterialComponents/angular-material/angular-material.module';
import { StarRatingModule } from 'angular-star-rating';
import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { KeySuccessContainerComponent } from './key-success-container/key-success-container.component';
import { KeyToSuccessModule } from '../key-to-success/key-to-success.module';
import { MyLibraryContainerComponent } from './my-library-container/my-library-container.component';
import { MyLibraryModule } from '../my-library/my-library.module';
import { CarouselContainerComponent } from './carousel-container/carousel-container.component';

import { RatingModule } from 'ng-starrating';
import { WatchComponent } from './watch/watch.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CommentsModule } from '../comments/comments.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    LayoutComponentComponent,
    KeySuccessContainerComponent,
    MyLibraryContainerComponent,
    CarouselContainerComponent,
    WatchComponent,
    
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    AngularMaterialModule,
    
    LayoutRoutingModule,
    ComponentsModule,
    KeyToSuccessModule,
    MyLibraryModule,
    RatingModule,
    NgxSpinnerModule,
    CommentsModule
    
    
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    LayoutComponentComponent,
    NgxSpinnerModule,
    
    
  ]
})
export class LayoutModule { }
