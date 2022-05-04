import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {registerLocaleData} from "@angular/common";
import ruLocale from "@angular/common/locales/ru";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { HomeLayoutComponent } from './shared/components/home-layout/home-layout.component';
import {SharedModule} from "./admin/shared/shared.module";
import {PostComponent} from "./shared/components/post/post.component";
import {AuthInterceptor} from "./admin/shared/auth.interceptor";
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';

registerLocaleData(ruLocale, 'ru')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
