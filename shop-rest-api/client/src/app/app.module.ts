import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService} from 'ngx-cookie-service';
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
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ProductCartComponent } from './shared/components/product-cart/product-cart.component';
import { ProductPageComponent } from './site-pages/product-page/product-page.component';
import { ReviewsPageComponent } from './site-pages/reviews-page/reviews-page.component';
import { ReviewRatingDirective } from './shared/directives/review-rating.directive';
import { ReviewComponent } from './site-pages/home-page/review/review.component';
import { RatingControlComponent } from './shared/components/review/rating-control/rating-control.component';
import { FlowRatingComponent } from './shared/components/review/flow-rating/flow-rating.component';
import { OrderPageComponent } from './site-pages/order-page/order-page.component';
import { CatalogPageComponent } from './site-pages/catalog-page/catalog-page.component';
import { StatesPipe } from './shared/pipes/shop-filters/states.pipe';
import { CategoryPipe } from './shared/pipes/shop-filters/category.pipe';
import { ChartDaysPipe } from './shared/pipes/shop-filters/chart-days.pipe';
import { SearchPipe } from './shared/pipes/shop-filters/search.pipe';
import { ValutaPipe } from './shared/pipes/shop-filters/valuta.pipe';
import { RangePricePipe } from './shared/pipes/shop-filters/range-price.pipe';
import { CategoryDayPipe } from './shared/pipes/shop-filters/category-day.pipe';
import { DayNowPipe } from './shared/pipes/day-now.pipe';
import { DialogBoxAcceptComponent } from './site-pages/order-page/dialog-box-accept/dialog-box-accept.component';

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
    RegisterPageComponent,
    LoaderComponent,
    ProductCartComponent,
    ProductPageComponent,
    ReviewsPageComponent,
    ReviewRatingDirective,
    ReviewComponent,
    RatingControlComponent,
    FlowRatingComponent,
    OrderPageComponent,
    CatalogPageComponent,
    StatesPipe,
    CategoryPipe,
    ChartDaysPipe,
    SearchPipe,
    ValutaPipe,
    RangePricePipe,
    CategoryDayPipe,
    DayNowPipe,
    DialogBoxAcceptComponent,
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
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
