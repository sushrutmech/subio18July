

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appImage'
})
export class AppImagePipe implements PipeTransform {

  transform(value: string = "", default_value?: string): any{
    if (value.length > 0) {
      return `data:image/jpeg;base64,${value}`;
    } else if (default_value) {
      return default_value;
    }
  }
}
