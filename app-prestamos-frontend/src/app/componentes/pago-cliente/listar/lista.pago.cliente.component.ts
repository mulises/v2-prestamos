import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/servicios/login/auth.service';
import { PagoCliente } from 'src/app/entidades/pago.cliente';
import { PagoClienteService } from 'src/app/servicios/pago.cliente/pago.cliente.service';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';

@Component({
  selector: 'app-lista.pago.cliente',
  templateUrl: './lista.pago.cliente.component.html',
  styleUrls: ['./lista.pago.cliente.component.css']
})
export class ListaPagoClienteComponent implements OnInit {

  listaPagos: PagoCliente[];
  cuadreCaja: CuadreCaja;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
    private pagoClienteService: PagoClienteService) { }

  ngOnInit(): void {
    let idCartera = this.activatedRoute.snapshot.paramMap.get("idCartera");
    
    this.authService.existeCuadreactivo(+idCartera).subscribe(response=>{
      this.cuadreCaja = response as CuadreCaja;
      this.pagoClienteService.getPagoClientePorCuadreActivo(this.cuadreCaja.id).subscribe(listaResponse =>{
        this.listaPagos = listaResponse as PagoCliente[];
      })
      
    })
        
  }

  eliminarPago(pagoCliente: PagoCliente): void {
    Swal.fire({
      title: 
        `¿Confirma eliminar pago para: ${pagoCliente.prestamo.cliente.entidad.nombres} ${pagoCliente.prestamo.cliente.entidad.apellidos} ?`,
      text: "Al eliminar el pago no se reflejará en el total de recaudo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.pagoClienteService.eliminarPagoCLiente(pagoCliente.id).subscribe(
          ()=>{
            this.listaPagos = this.listaPagos.filter(pago => pago.id != pagoCliente.id)
            Swal.fire(
              'Eliminado!',
              'El pago fue eliminado con exitosamente.',
              'success'
            )
          }
        );
        
      }
    })
    
  }


}
