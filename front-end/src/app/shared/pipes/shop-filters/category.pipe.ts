import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items: Product[], states: string[]): Product[] {
    return items.filter(item => {
      return states.length == 0 ? true : item.category.map(category => states.includes(category)).includes(true);
    })
  }

}
