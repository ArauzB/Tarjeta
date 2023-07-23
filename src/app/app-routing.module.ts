import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AgregarTarjetaComponent } from './component/agregar-tarjeta/agregar-tarjeta.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'agregar-tarjeta', component: AgregarTarjetaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
