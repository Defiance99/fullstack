import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

interface Price {
  'range': string,
  'price': string
}

@Pipe({
  name: 'rangePrice',
  pure: false,
})
export class RangePricePipe implements PipeTransform {

  transform(items: Product[], value: Price): Product[] {
    return value.price.length == 0 ? items: 
    (value.range == 'max') ? 
    items.filter(item => +item.price <= +value.price) : 
    items.filter(item => +item.price >= +value.price);
  }

}
