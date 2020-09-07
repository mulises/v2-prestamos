import { Component, OnInit } from '@angular/core';
import { CuadreCajaService } from 'src/app/servicios/cuadre.caja/cuadre.caja.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { Cartera } from 'src/app/entidades/cartera';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-info.flujo.caja.cartera',
  templateUrl: './info.flujo.caja.cartera.component.html',
  styleUrls: ['./info.flujo.caja.cartera.component.css']
})
export class InfoFlujoCajaCarteraComponent implements OnInit {

  flujoCajaForm: FormGroup;
  cartera: Cartera;

  constructor(private cuadreService: CuadreCajaService, private activatedRoute: ActivatedRoute,
    private carteraService: CarteraService, private formBuilder: FormBuilder) {    
  }


  ngOnInit(): void {

    this.flujoCajaForm = this.formBuilder.group({
      fechaInicio:['',Validators.required],
      fechaFin:['',Validators.required],
    })
    let idCartera = this.activatedRoute.snapshot.paramMap.get('idCartera');
    this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(carteraReturn => {
      this.cartera = carteraReturn;
    });
  }

  descargarFlujoDeCaja(): void {
    let fechaInicio = this.flujoCajaForm.controls.fechaInicio.value;
    let fechaFin = this.flujoCajaForm.controls.fechaFin.value;
    let nombreArchivo = 'flujo_caja.xls';
    this.cuadreService.informeFlujoCaja(nombreArchivo,this.cartera.id, fechaInicio,fechaFin).subscribe(data => {
      saveAs(new Blob([data], {type:'application/vnd.ms-excel'}), nombreArchivo);    
    });
  }

}
