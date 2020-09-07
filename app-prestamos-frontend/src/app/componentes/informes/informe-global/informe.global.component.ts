import { Component, OnInit } from '@angular/core';
import { Cartera } from 'src/app/entidades/cartera';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import { Prestamo } from 'src/app/entidades/prestamo';

@Component({
  selector: 'app-informe.global',
  templateUrl: './informe.global.component.html',
  styleUrls: ['./informe.global.component.css']
})
export class InformeGlobalComponent implements OnInit {

  listaCarteras: Cartera[];
  
  constructor(carteraService: CarteraService) {
    carteraService.getCarteras().subscribe((carterasResp:any) => {
      this.listaCarteras = carterasResp;
      console.log(this.listaCarteras)
    });
  }

  ngOnInit(): void {
  }

  exportarCreditos(idCartera: number): void {

    let carteraFiltrada: Cartera;
    let prestamosActivos: Prestamo[];

    this.listaCarteras
    .filter(cartera => cartera.id == 2)
    .map(cartera => {
      carteraFiltrada = cartera
      console.log(cartera.clientes.filter(prestamo => prestamo.activo))
    });
  }

}
