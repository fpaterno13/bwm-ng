//este module se creo para sacar todos los imports relacionados a rental de app.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //lo agregue para poder usar el *ngFor para el loop
import { Routes, RouterModule } from '@angular/router'; //ROUTING: agrego el import
import { HttpClientModule } from '@angular/common/http'; //conexion al node server
import { NgPipesModule } from 'ngx-pipes'; //custom pipes
import { MapModule } from '../common/map/map.module'; //google maps
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from '../common/service/helper.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';

//ROUTING: se encarga del routing. en app.component.html esta el <router-outlet> que llama a esta constante y se encarga de todo
const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] } //can activate: hace toda la verificacion de authGuard
    ]
  }
]

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), //ROUTING: agrego el import. routes es el nombre de la constante
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ], 
  providers: [
    RentalService,
    HelperService,
    BookingService
  ]
})

export class RentalModule { }
