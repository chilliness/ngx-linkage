import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { LinkageBaseComponent } from './components/linkage-base/linkage-base.component';
import { LinkageTimeComponent } from './components/linkage-time/linkage-time.component';
import { LinkageDateComponent } from './components/linkage-date/linkage-date.component';
import { LinkageAddrComponent } from './components/linkage-addr/linkage-addr.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LinkageBaseComponent,
    LinkageTimeComponent,
    LinkageDateComponent,
    LinkageAddrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
