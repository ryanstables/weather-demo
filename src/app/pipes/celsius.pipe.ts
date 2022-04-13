import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(C: number): unknown {
    return Math.round(C).toString() + '˚C';
  }

}
