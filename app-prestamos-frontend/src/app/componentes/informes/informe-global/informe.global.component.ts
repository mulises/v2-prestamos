import { Component, OnInit } from '@angular/core';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import { InfoGlobal } from 'src/app/entidades/interfaces/info-global';

@Component({
  selector: 'app-informe.global',
  templateUrl: './informe.global.component.html',
  styleUrls: ['./informe.global.component.css']
})
export class InformeGlobalComponent implements OnInit {

  listaCarterasInfoGlobal: InfoGlobal[];
  
  constructor(private carteraService: CarteraService) {
    carteraService.getCarterasInfoGlobal().subscribe((carterasInfoGloblaResp:any) => {
      this.listaCarterasInfoGlobal = carterasInfoGloblaResp;
    });
  }

  ngOnInit(): void {
  }

  exportarCreditos(idCartera: number): void {
    let nombreArchivo = 'creditos_activos.xls';
    this.carteraService.informePrestamosActivos(nombreArchivo,idCartera).subscribe(data => {
      saveAs(new Blob([data], {type:'application/vnd.ms-excel'}), nombreArchivo);    
    });
  }

}
