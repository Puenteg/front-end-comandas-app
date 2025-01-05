import { Component, EventEmitter, Output } from '@angular/core';
import { ComandaserviceService } from '../comandaservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productos: any[] = [];
  @Output() hacerPedido: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(service: ComandaserviceService) {
    service.getProductos().then(
      (success) => this.productos = success
    )
  }

}
