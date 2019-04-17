import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const result = value.slice(0);
    return result.split('\n').join('<br/>');
  }

}
