import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {environment} from '../environments/environment';
import {WebsiteModule} from '@candiman/website';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ContentForModelComponent } from './components/content-for-model/content-for-model.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentForModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    WebsiteModule.forRoot({
      loginUrl: environment.restUrl + '/authentication/login',
      alertDelayInSeconds: 7
    }),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
