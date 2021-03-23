import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModel } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './site-pages/home-page/home-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { FrontAdminPageComponent } from './admin-panel-pages/front-admin-page/front-admin-page.component';
import { CreateProductPageComponent } from './admin-panel-pages/create-product-page/create-product-page.component';
import { MainPanelPageComponent } from './admin-panel-pages/main-panel-page/main-panel-page.component';
import { CatalogPanelPageComponent } from './admin-panel-pages/catalog-panel-page/catalog-panel-page.component';
import { AnalyticsPanelPageComponent } from './admin-panel-pages/analytics-panel-page/analytics-panel-page.component';
import { SettingsPanelPageComponent } from './admin-panel-pages/settings-panel-page/settings-panel-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { LoginPageComponent } from './admin-panel-pages/login-page/login-page.component';
import { RegisterPageComponent } from './admin-panel-pages/register-page/register-page.component';
import { TokenInterseptor } from './shared/classes/token.interseptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainLayoutComponent,
    AdminPanelComponent,
    FrontAdminPageComponent,
    CreateProductPageComponent,
    MainPanelPageComponent,
    CatalogPanelPageComponent,
    AnalyticsPanelPageComponent,
    SettingsPanelPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MaterialModel,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
