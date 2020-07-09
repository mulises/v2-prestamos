import { Component, OnInit } from '@angular/core';
import { CuadreCajaService } from 'src/app/servicios/cuadre.caja/cuadre.caja.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { Cartera } from 'src/app/entidades/cartera';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';

@Component({
  selector: 'app-info.flujo.caja.cartera',
  templateUrl: './info.flujo.caja.cartera.component.html',
  styleUrls: ['./info.flujo.caja.cartera.component.css']
})
export class InfoFlujoCajaCarteraComponent implements OnInit {

  cartera: Cartera;

  constructor(private cuadreService: CuadreCajaService, private activatedRoute: ActivatedRoute,
    private carteraService: CarteraService) {
    
  }


  ngOnInit(): void {
    let idCartera = this.activatedRoute.snapshot.paramMap.get('idCartera');
    this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(carteraReturn => {
      console.log(carteraReturn)
      this.cartera = carteraReturn;

    });
  }

  descargarFlujoDeCaja(): void {
    console.log('entra')
    let nombreArchivo = 'flujo_caja'+new Date()+'.xls';
    this.cuadreService.informeFlujoCaja(nombreArchivo,this.cartera.id).subscribe(data => {
      saveAs(new Blob([data], {type:'application/vnd.ms-excel'}), nombreArchivo);
    
    });
  }

}
