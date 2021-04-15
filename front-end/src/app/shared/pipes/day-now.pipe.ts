import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayNow'
})
export class DayNowPipe implements PipeTransform {

  transform(day: number): string {
    switch(day) {
      case 0:
        return 'Воскресенье';
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      default:
        return 'Воскресенье';
    }
  }

}
