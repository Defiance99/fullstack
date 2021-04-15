import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'chartDays'
})
export class ChartDaysPipe implements PipeTransform {

  transform(items: Product[], states: string[]): Product[] {
    return items.filter(item => {
      return states.length == 0 ? true : item.chartDays.map(chartDay => states.includes(chartDay)).includes(true);
    })
  }

}
