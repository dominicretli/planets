import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'decimalSpace',
  pure: true
})
export class DecimalSpacePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  // relying on the built-in DecimalPipe.
  // I could have also wrote a function that adds a space ever 3rd digit
  transform(value: string): string {
    try {
      const decimalPipeResult: string | null = this.decimalPipe.transform(value);

      if (!decimalPipeResult) {
        return value;
      }

      return decimalPipeResult.split(',').join(' ');
    } catch {
      return value;
    }
  }
}
