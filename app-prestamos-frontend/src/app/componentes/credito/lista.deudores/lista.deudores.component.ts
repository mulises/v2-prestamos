import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditoService } from 'src/app/servicios/credito/credito.service';
import { Prestamo } from 'src/app/entidades/prestamo';
import { PagoCliente } from 'src/app/entidades/pago.cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista.deudores',
  templateUrl: './lista.deudores.component.html',
  styleUrls: ['./lista.deudores.component.css']
})
export class ListaDeudoresComponent implements OnInit {

  listaPrestamos: Prestamo[];
  listaPrestamosTotal: Prestamo[];

  constructor(private route: ActivatedRoute, private creditoService: CreditoService) {
    this.listaPrestamos = new Array();
  }

  ngOnInit(): void {
    
    let idCartera = this.route.snapshot.paramMap.get("idCartera");
    this.creditoService.getCreditosParaCobroByCartera(+idCartera).subscribe(prestamos => {
      this.listaPrestamos = prestamos;
    })
  }

  async generarPagoCuota(prestamo: Prestamo) {
     const { value: valorPagoCuota } =  await Swal.fire({
      title: `${prestamo.cliente.entidad.nombres} ${prestamo.cliente.entidad.apellidos}`,
      text: `Valor de cuota pactado: ${prestamo.valorCuota}`,
      input: 'number',
      inputPlaceholder: 'Ingrese valor a pagar',
      inputValue: `${prestamo.valorCuota}`
    })
    
    if (valorPagoCuota) {
      
      let pagoCliente = new PagoCliente();
      pagoCliente.prestamo = prestamo;
      pagoCliente.valorPago = valorPagoCuota;
      this.creditoService.generarPagoCliente(pagoCliente).subscribe(
        response=>{
          Swal.fire({
              title: `Pago realizado por: ${valorPagoCuota}`,
              text: `Nuevo saldo para ${pagoCliente.prestamo.cliente.entidad.nombres} ${pagoCliente.prestamo.cliente.entidad.apellidos}: ${pagoCliente.prestamo.saldoActual - pagoCliente.valorPago} `,
              icon: 'success' 
          })
          this.listaPrestamos = this.listaPrestamos.filter(credito => credito.id != response.pagoCliente.prestamo.id);
        },err=>{
          Swal.fire({
           title: err.error.mensajeError,
           icon: 'error' 
          })
        }

      );
    }
  }

}
