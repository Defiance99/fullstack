import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
declare const showModalMessage: any;


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scheduleDaysWrapper') scheduleRef!: ElementRef;
  @ViewChild('menuItemsWrapper') menuItemsRef!: ElementRef;
  weekDays: string[] = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  today: number = 0;
  products$: Observable<Product[]> | undefined;
  menuProducts$: Observable<Product[]> | undefined;
  ecoProducts$: Observable<Product[]> | undefined;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    let day = new Date();
    this.today = day.getDay();
    this.products$ = this.productService.getByFilters('Обед', this.weekDays[this.today]);
    this.menuProducts$ = this.productService.getByFilters('Десерт', this.weekDays[this.today]);
    this.ecoProducts$ = this.productService.getProducts();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    let scheduleDays = this.scheduleRef.nativeElement.querySelectorAll('.schedule-days__item');
    let menuItems = this.menuItemsRef.nativeElement.querySelectorAll('.schedule-days__item');
    this.initMenuItems(scheduleDays, 'Обед');
    this.initMenuItems(menuItems, '', true);
  }

  initMenuItems(menu: any, category: string = '', isActiveFirstItem: Boolean = false) {

    isActiveFirstItem ? menu[0].classList.add('schedule-days__item_active') : 
    this.today != 0 ? menu[this.today - 1].classList.add('schedule-days__item_active') :  
    menu[6].classList.add('schedule-days__item_active');

    for (let menuItem of menu) {
      menuItem.addEventListener('click', () => {

        if (menuItem.classList.contains('schedule-days__item_active')) return;

        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.remove('schedule-days__item_active');
        }

        if (category) {
          let day = menuItem.getAttribute('value');
          this.products$ = this.productService.getByFilters(category, day);
        } else {
          let category = menuItem.getAttribute('value');
          this.menuProducts$ = this.productService.getByFilters(category, this.weekDays[this.today]);
        }
        menuItem.classList.add('schedule-days__item_active');
      })
    }
  }

  openMessageModal(message: string) {
    showModalMessage(message);
  }

}
