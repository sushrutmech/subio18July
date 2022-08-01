import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SuccessKeyChartComponent } from './success-key-chart/success-key-chart.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ViewContentComponent } from './view-content/view-content.component';
import { SuccessKeyLockComponent } from './success-key-lock/success-key-lock.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { OnHoverKeyComponent } from './on-hover-key/on-hover-key.component';
import { AngularMaterialModule } from 'src/app/angularMaterialComponents/angular-material/angular-material.module';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};



@NgModule({
  declarations: [
    AssessmentFormComponent,
    SuccessKeyChartComponent,
    VideoPlayerComponent,
    PdfViewerComponent,
    ViewContentComponent,
    SuccessKeyLockComponent,
    AlertBoxComponent,
    CommentboxComponent,
    OnHoverKeyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    NgxExtendedPdfViewerModule ,
    NgWizardModule.forRoot(ngWizardConfig) ,
    AngularMaterialModule
  ],
  exports: [
    AssessmentFormComponent,
    SuccessKeyChartComponent,
    VideoPlayerComponent,
    PdfViewerComponent,
    ViewContentComponent,
    SuccessKeyLockComponent,
    AlertBoxComponent,
    CommentboxComponent,
    OnHoverKeyComponent
  ]
})
export class ComponentsModule { }
