import { Pipe, PipeTransform } from '@angular/core';
import { NationalityService } from '../services/nationality/nationality.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'nationality'
})
export class NationalityPipe implements PipeTransform {
  constructor(private nationalityService: NationalityService) {}

  transform(value: any, args?: any): any {
    return this.nationalityService.GetInfoByNationality(value).pipe(
      map(res => {
        if (res === undefined) {
          return value;
        } else {
          return res.en_short_name;
        }
      })
    );
  }
}
