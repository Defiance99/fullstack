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

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent, data: {title: 'Главная'}}
    ]
  },
  {
    path: 'admin-panel', component: AdminPanelComponent, children: [
      {path: '', component: MainPanelPageComponent, data: {title: 'Админ панель'}},
      {path: 'create-product', component: CreateProductPageComponent, data: {title: 'Создание товара'}},
      {path: 'catalog', component: CatalogPanelPageComponent, data: {title: 'Каталог'}},
      {path: 'analytics', component: AnalyticsPanelPageComponent, data: {title: 'Аналитика'}},
      {path: 'settings', component: SettingsPanelPageComponent, data: {title: 'Настройки'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
