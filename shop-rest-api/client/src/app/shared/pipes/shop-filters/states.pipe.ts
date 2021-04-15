import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'states'
})
export class StatesPipe implements PipeTransform {

  transform(items: Product[], states: string[]): Product[] {
    return items.filter(item => {
      return states.length == 0 ? true : item.bonuses.map(bonus => states.includes(bonus)).includes(true);
    })
  }

}
