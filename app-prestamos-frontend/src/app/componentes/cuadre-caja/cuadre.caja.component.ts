import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuadreCajaService } from 'src/app/servicios/cuadre.caja/cuadre.caja.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

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
          console.log(carteraParam)
          this.cuadreForm.controls.cartera.get('id').setValue(carteraParam.id);
          this.cuadreForm.controls.cartera.get('nombre').setValue(carteraParam.nombre);
          this.cuadreForm.controls.cartera.get('descripcion').setValue(carteraParam.descripcion);
          this.cuadreForm.controls.cartera.get('porcentajePrestamo').setValue(carteraParam.porcentajePrestamo);
          console.log(this.cuadreForm.controls.cartera.get('nombre').value)
        });
      }
    })
    
    
  }

  crearCuadre(): void {
    this.cuadreService.crearCuadreCaja(this.cuadreForm.value as CuadreCaja).subscribe(cuadreCreado => {
      console.log(cuadreCreado)
      this.cuadreForm.setValue(cuadreCreado)
      Swal.fire('Cuadre Confirmado','','success');
    });
  }

  editarCuadre(): void {
    console.log(this.cuadreForm.controls)
    this.cuadreService.actualizarCuadreCaja(this.cuadreForm.value as CuadreCaja).subscribe(cuadreActualizado => {
      console.log(cuadreActualizado);
      Swal.fire('Cuadre Editado','Se ha modificado el valor base','success');
    });
  }

  descargarInforme(): void {
    
    this.cuadreService.descargar('nombreArchivo_frontend.xls',this.cuadreForm.controls.id.value).subscribe(data => {

      //let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(new Blob([data], {type:'application/vnd.ms-excel'}), 'nombreArchivo_frontend.xls');
    
    });
  }

  //Metodo para inicializar el formulario
  private inicializarFormularioCuadre(): void{
    this.cuadreForm = this.fb.group({
      id:null,
      valorBase:['',Validators.required],
      fechaCreacion:({value:'',disabled:true}),
      totalRecaudo:'',
      totalPrestado:'',
      confirmado:false,
      observaciones:'',
      totalMulta:'',
      fechaConfirmacion:'',
      totalGasto:'',
      cartera: this.fb.group({
        id:null,
        nombre:'',
        descripcion:'',
        porcentajePrestamo:''
      })
    })
  }

}
