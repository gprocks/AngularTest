import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamTranslator'
})
export class TeamTranslatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'Haas F1 Team') {
      return 'Haas';
    } else {
      return value;
    }
  }

}
