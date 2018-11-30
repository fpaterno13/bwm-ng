import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' //ROUTING: agrego el import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';

import { RentalModule } from './rental/rental.module';//se agrego para evitar agregar en este archivo todos los imports de rental
import { AuthModule } from './auth/auth.module';
import { ManageModule } from './manage/manage.module';

//ROUTING: se encarga del routing. en app.component.html esta el <router-outlet> que llama a esta constante y se encarga de todo
const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' } //si voy a la home me redirige a rentals, que es el que tiene la logica para mostrar todos o 1 component. 
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [ //cada vez que agregamos un import arriba, lo tenemos que agregar aca
    RouterModule.forRoot(routes), //ROUTING: agrego el import
    BrowserModule,
    RentalModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    ManageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
