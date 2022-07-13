
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkTarget, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() src: any;
  @Output() onLoad: EventEmitter<any> = new EventEmitter();

  fileName: string = 'download.pdf';

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    pdfDefaultOptions.externalLinkTarget = LinkTarget.BLANK;
  }

  ngOnChanges(changes: any): void {
    if (changes.src && changes.src.currentValue) {
      this.src = changes.src.currentValue;
      this.fileName = this.getFilename(this.src) || 'download.pdf';
    }
  }

  onPdfLoad() {
    this.hideLoading();
    this.onLoad.emit();
  }

  handlePdfLoading() {
    this.spinner.show('pdf-viewer');
  }

  onFailedPdfLoad() {
    this.hideLoading();
  }

  hideLoading() {
    this.spinner.hide('pdf-viewer');
  }

  getFilename(url: string) {
    if (url) {
      var m = url.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1) {
        return `${m[1]}.pdf`;
      }
    }
    return "download.pdf";
  }

}
