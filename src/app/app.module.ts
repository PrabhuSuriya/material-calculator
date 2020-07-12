import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { DisplayComponent } from './components/display/display.component';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
import { SimpleCalcState } from './store/simple-calc-state/simple-calc.state';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SimpleCalculatorComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([SimpleCalcState]),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
