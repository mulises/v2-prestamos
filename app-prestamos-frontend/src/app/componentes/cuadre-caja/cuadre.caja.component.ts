import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuadreCajaService } from 'src/app/servicios/cuadre.caja/cuadre.caja.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-cuadre.caja',
  templateUrl: './cuadre.caja.component.html',
  styleUrls: ['./cuadre.caja.component.css']
})
export class CuadreCajaComponent implements OnInit {

  cuadreForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, 
    private cuadreService: CuadreCajaService, private fb: FormBuilder, private carteraService: CarteraService) { }

  ngOnInit(): void {
    
    this.inicializarFormularioCuadre();
    let idCartera = this.activatedRoute.snapshot.paramMap.get('idCartera');
    let carteraParam;
    
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
      cartera: this.fb.group({
        id:null,
        nombre:'',
        descripcion:'',
        porcentajePrestamo:''
      })
    })
  }

}
