import { Component, OnInit, Input } from '@angular/core';
import { Prestamo } from 'src/app/entidades/prestamo';
import { ModalService } from 'src/app/servicios/modal.service';
import Swal from 'sweetalert2';
import { CreditoService } from 'src/app/servicios/credito/credito.service';

@Component({
  selector: 'lista-creditos',
  templateUrl: './lista.creditos.component.html',
  styleUrls: ['./lista.creditos.component.css']
})
export class ListaCreditosComponent implements OnInit {

  @Input() listaPrestamos: Prestamo[]
  
  constructor(public modalService: ModalService, private creditoService: CreditoService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.listaPrestamos = null;
  }

  eliminarPrestamo(idPrestamo: number): void {
    let prestamo = this.listaPrestamos.find(prestamo => prestamo.id = idPrestamo);

    if(prestamo.ampliacion) {
      Swal.fire('Este Credito es una paliación','Contacte al administrador','error')
    }else {
      Swal.fire({
        title: '¿Eliminar el prestamo?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          this.creditoService.eliminarPrestamo(idPrestamo).subscribe(
            ()=>{
              this.listaPrestamos = this.listaPrestamos.filter(prestamo => prestamo.id != idPrestamo);
              Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              )            
              this.modalService.notificarModificacionListaPrestamos.emit(this.listaPrestamos);
            }
          );        
        }
      })
    }
    
  }

}
