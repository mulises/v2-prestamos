import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gasto } from 'src/app/entidades/gasto';
import { GastoService } from 'src/app/servicios/gasto/gasto.service';

@Component({
  selector: 'app-lista.gasto',
  templateUrl: './lista.gasto.component.html',
  styleUrls: ['./lista.gasto.component.css']
})
export class ListaGastoComponent implements OnInit {

  listaGasto: Gasto[];

  constructor(private activatedRoute: ActivatedRoute, private gastoService: GastoService) { }


  ngOnInit(): void {
    let idCartera = this.activatedRoute.snapshot.paramMap.get("idCartera");
    if(idCartera) {
      this.gastoService.listaGastoByCuadre(+idCartera).subscribe(listaGastoDB =>{
        this.listaGasto = listaGastoDB as Gasto[];
      });
    }

  }

}
