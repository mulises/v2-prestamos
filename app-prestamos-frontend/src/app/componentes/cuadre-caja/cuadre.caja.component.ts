import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuadreCajaService } from 'src/app/servicios/cuadre.caja/cuadre.caja.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Prestamo } from 'src/app/entidades/prestamo';
import { CreditoService } from 'src/app/servicios/credito/credito.service';
import { ModalService } from 'src/app/servicios/modal.service';
import { Cartera } from 'src/app/entidades/cartera';

@Component({
  selector: 'app-cuadre.caja',
  templateUrl: './cuadre.caja.component.html',
  styleUrls: ['./cuadre.caja.component.css']
})
export class CuadreCajaComponent implements OnInit {

  cuadreForm: FormGroup;
  listaPrestamos: Prestamo[];

  constructor(private activatedRoute: ActivatedRoute, 
    private cuadreService: CuadreCajaService, private fb: FormBuilder, 
    private carteraService: CarteraService, private creditoService: CreditoService,
    public modalService: ModalService) { }

  ngOnInit(): void {
    
    this.inicializarFormularioCuadre();
    let idCartera = this.activatedRoute.snapshot.paramMap.get('idCartera');
    let carteraParam: Cartera;
    
    this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(cartera => {
      carteraParam = cartera;
      if(idCartera) {
        this.cuadreService.cuadreCajaActivo(+idCartera).subscribe(cuadreActivo =>{
          this.cuadreForm.setValue(cuadreActivo);          
        },
        err =>{
          
          let mensajeError = 'error no controlado: ' + err.error.message;
          if(err.error.mensajeError) {
            mensajeError = err.error.mensajeError;
          }
        
          Swal.fire({
            icon: 'error',
            title: mensajeError
          })
          

          this.cuadreForm.controls.cartera.get('id').setValue(carteraParam.id);
          this.cuadreForm.controls.cartera.get('nombre').setValue(carteraParam.nombre);
          this.cuadreForm.controls.cartera.get('descripcion').setValue(carteraParam.descripcion);
          this.cuadreForm.controls.cartera.get('porcentajePrestamo').setValue(carteraParam.porcentajePrestamo);
        });
      }
    })

    //Se actualizan los valores de resumen al eliminar un prestamo
    this.modalService.notificarModificacionListaPrestamos.subscribe((nuevaLista: Prestamo[]) => {
      
      let totalPrestamos = 0;
      let totalAbono = 0;

      nuevaLista.forEach(element => {
        totalPrestamos += element.montoPrestamo;
        totalAbono += element.valorAbono;
      });
      
      this.cuadreForm.controls.totalPrestado.setValue(totalPrestamos);
      this.cuadreForm.controls.totalAbono.setValue(totalAbono);
    })   
    
  }

  crearCuadre(): void {
    this.cuadreService.crearCuadreCaja(this.cuadreForm.value as CuadreCaja).subscribe(cuadreCreado => {
      this.cuadreForm.setValue(cuadreCreado)
      Swal.fire('Cuadre Confirmado','','success');
    });
  }

  editarCuadre(): void {
    this.cuadreService.actualizarCuadreCaja(this.cuadreForm.value as CuadreCaja).subscribe(cuadreActualizado => {
      Swal.fire('Cuadre Editado','Se ha modificado el valor base','success');
    });
  }

  /**
   * Metodos para listar los registros de cada resumen
  */

  listarPrestamos() {
    this.creditoService.getCreditosPorCuadreDiario(+this.cuadreForm.controls.id.value).subscribe(listaPrestamosResp => {
      this.listaPrestamos = listaPrestamosResp as Prestamo[];
      this.modalService.abrirModal();
    })
  }

  //Metodo para inicializar el formulario
  private inicializarFormularioCuadre(): void{
    this.cuadreForm = this.fb.group({
      id:null,
      valorBase:['',Validators.required],
      fechaCreacion:({value:'',disabled:true}),
      totalRecaudado:'',
      totalPrestado:'',
      confirmado:false,
      observaciones:null,
      totalMulta:'',
      fechaConfirmacion:'',
      totalGasto:'',
      totalAbono:'',
      valorRealRecibido:0,
      cartera: this.fb.group({
        id:null,
        nombre:'',
        descripcion:'',
        porcentajePrestamo:'',
        cantidadPrestamosActivos:0,
        saldoPendienteTotal:0
      })
    })
  }

}
