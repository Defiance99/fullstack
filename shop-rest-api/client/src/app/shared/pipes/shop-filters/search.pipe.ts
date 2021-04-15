import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Product[], value: string): Product[] {
    return items.filter(item => item.name.includes(value));
  }

}
