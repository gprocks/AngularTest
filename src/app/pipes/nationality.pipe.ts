import { Pipe, PipeTransform } from '@angular/core';
import { NationalityService } from '../services/nationality/nationality.service';

@Pipe({
  name: 'nationality'
})
export class NationalityPipe implements PipeTransform {

  constructor(private nationalityService: NationalityService) {
  }

  transform(value: any, args?: any): any {

    return this.nationalityService.GetInfoByNationality(value)
      .map(res => {
        if (res === undefined) {
          console.log(value);
          return value;
        } else {
          console.log(res.en_short_name);
          return res.en_short_name;
        }
      });

  }

}
