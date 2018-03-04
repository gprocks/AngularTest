import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge'
})
export class GetAgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
