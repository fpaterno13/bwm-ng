//este module se creo para sacar todos los imports relacionados a rental de app.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //lo agregue para poder usar el *ngFor para el loop
import { Routes, RouterModule } from '@angular/router' //ROUTING: agrego el import

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';

import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

//ROUTING: se encarga del routing. en app.component.html esta el <router-outlet> que llama a esta constante y se encarga de todo
const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent }
    ]
  }
]

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) //ROUTING: agrego el import. routes es el nombre de la constante
  ], 
  providers: [RentalService]
})

export class RentalModule { }