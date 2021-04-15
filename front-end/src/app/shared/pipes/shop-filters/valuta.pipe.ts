import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'valuta'
})
export class ValutaPipe implements PipeTransform {

  transform(items: Product[], value: string): Product[] {
    return items.filter(item => item.currency.includes(value));
  }

}
