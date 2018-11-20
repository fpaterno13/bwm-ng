import { Component, OnInit, Input } from '@angular/core'; //Agregue el input

@Component({
  selector: 'bwm-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.scss']
})
export class RentalListItemComponent implements OnInit {

  @Input() rental: any; //se agrega para pasarle los hijos desde el componente List

  constructor() { }

  ngOnInit() {
  }

}
