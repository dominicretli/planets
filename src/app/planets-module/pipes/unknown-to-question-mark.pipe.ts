import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknownToQuestionMark'
})
export class UnknownToQuestionMarkPipe implements PipeTransform {
  transform(value: string): string {
    if(value === 'unknown') {
      return '?';
    } else {
      return value;
    }
  }

}
