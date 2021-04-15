import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

interface CategoryDay {
  'category': string
  'day': string,
  'limit': number
}

@Pipe({
  name: 'categoryDay',
  pure: false
})
export class CategoryDayPipe implements PipeTransform {

  transform(items: Product[], states: CategoryDay): Product[] {
    return items.filter( (item: Product, index: number, array: Product[]) => {
      return index <= states.limit ? item.category.includes(states.category) ? item.chartDays.includes(states.day) : false: false;
    })
  }

}
