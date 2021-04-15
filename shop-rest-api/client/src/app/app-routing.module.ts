import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './site-pages/home-page/home-page.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { CreateProductPageComponent } from './admin-panel-pages/create-product-page/create-product-page.component';
import { MainPanelPageComponent } from './admin-panel-pages/main-panel-page/main-panel-page.component';
import { CatalogPanelPageComponent } from './admin-panel-pages/catalog-panel-page/catalog-panel-page.component';
import { AnalyticsPanelPageComponent } from './admin-panel-pages/analytics-panel-page/analytics-panel-page.component';
import { SettingsPanelPageComponent } from './admin-panel-pages/settings-panel-page/settings-panel-page.component';
import { LoginPageComponent } from './admin-panel-pages/login-page/login-page.component';
import { RegisterPageComponent } from './admin-panel-pages/register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { ProductPageComponent } from './site-pages/product-page/product-page.component';
import { ReviewsPageComponent } from './site-pages/reviews-page/reviews-page.component';
import { OrderPageComponent } from './site-pages/order-page/order-page.component';
import { CatalogPageComponent } from './site-pages/catalog-page/catalog-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent, data: {title: 'Главная'}},
      {path: 'product/:id', component: ProductPageComponent, data: {title: 'Карточка товара'}},
      {path: 'reviews', component: ReviewsPageComponent, data: {title: 'Отзывы'}},
      {path: 'order', component: OrderPageComponent, data: {title: 'Корзина заказов'}},
      {path: 'catalog', component: CatalogPageComponent, data: {title: 'Каталог'}},
    ]
  },
  {
    path: 'admin-panel', component: AdminPanelComponent, children: [
      {path: '', canActivate: [AuthGuard] ,component: MainPanelPageComponent, data: {title: 'Админ панель'}},
      {path: 'create-product', pathMatch: 'full' ,canActivate: [AuthGuard] ,component: CreateProductPageComponent, data: {title: 'Создание товара'}},
      {path: 'catalog', canActivate: [AuthGuard] ,component: CatalogPanelPageComponent, data: {title: 'Каталог'}},
      {path: 'analytics', canActivate: [AuthGuard] ,component: AnalyticsPanelPageComponent, data: {title: 'Аналитика'}},
      {path: 'settings', canActivate: [AuthGuard] ,component: SettingsPanelPageComponent, data: {title: 'Настройки'}},
      {path: 'login', component: LoginPageComponent, data: {title: 'Вход в систему'}},
      {path: 'sign-up', component: RegisterPageComponent, data: {title: 'Регистрация'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
