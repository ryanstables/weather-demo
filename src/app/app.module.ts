import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapitalisePipe } from './pipes/capitalise.pipe';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalisePipe,
    CelsiusPipe,
    PercentagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
