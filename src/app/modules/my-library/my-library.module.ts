import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLibraryRoutingModule } from './my-library-routing.module';
import { MyLibraryComponent } from './my-library/my-library.component';

import { RatingModule } from 'ng-starrating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule  } from '../../shared/components/components.module'
import { AngularMaterialModule } from 'src/app/angularMaterialComponents/angular-material/angular-material.module';
import { StarRatingModule } from 'angular-star-rating';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    MyLibraryComponent
  ],
  imports: [
    CommonModule,
    MyLibraryRoutingModule,
    RatingModule,

    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AngularMaterialModule,
    RatingModule,
    NgxExtendedPdfViewerModule
    
  ],
  exports:[
    MyLibraryComponent
  ]
})
export class MyLibraryModule { }
