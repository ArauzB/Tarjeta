import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { AgregarTarjetaComponent } from './component/agregar-tarjeta/agregar-tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgregarTarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Importar FormsModule para usar ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
