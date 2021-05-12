import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "teamTranslator"
})
export class TeamTranslatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(" F1 Team", "");
  }

}
