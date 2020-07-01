import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cartera } from 'src/app/entidades/cartera';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import { GastoService } from 'src/app/servicios/gasto/gasto.service';
import { Gasto } from 'src/app/entidades/gasto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form.gasto',
  templateUrl: './form.gasto.component.html',
  styleUrls: ['./form.gasto.component.css']
})
export class FormGastoComponent implements OnInit {

  gastoForm: FormGroup;
  cartera: Cartera;
  listaGasto: Gasto[];

  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute, 
    private carteraService: CarteraService, private gastoService: GastoService) { }

  ngOnInit(): void {
    this.inicializarVariablesFormularioGasto();
    let idCartera = this.activatedRoute.snapshot.paramMap.get("idCartera");
    if(idCartera) {
      this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(carteraResponse => {
        this.cartera = carteraResponse;  
        this.gastoForm.get('ruta').setValue(this.cartera);
      });
      this.gastoService.listaGastoByCuadre(+idCartera).subscribe(listaGastoDB =>{
        this.listaGasto = listaGastoDB as Gasto[];
      });
    }
  }

  crearGasto(): void {
    this.gastoService.crearGasto(this.gastoForm.value as Gasto).subscribe(response => {
      this.alertaSweet('success','Registro exitoso', `${response.gasto.descripcion}: ${response.gasto.valorGasto}`);
      this.listaGasto.push(response.gasto);
      this.gastoForm.reset();
    },err => {
      this.alertaSweet('error',err.error.mensajeError, 'Consulte al supervisor');
    })
  }

  editarGasto(): void {
    this.gastoService.actualizarGasto(this.gastoForm.value as Gasto).subscribe(response => {
      Swal.fire(response.gasto.descripcion, 'Actualizado con exito', 'success');
      this.listaGasto = this.listaGasto.filter(gasto => gasto.id != this.gastoForm.controls.id.value);
      this.listaGasto.push(response.gasto)
    })
  }

  eliminarGasto(gasto: Gasto): void {
    
    Swal.fire({
      title: 'Seguro desea eliminar el gasto: ' + gasto.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.gastoService.eliminarGasto(gasto.id).subscribe(
          () => {
            this.listaGasto = this.listaGasto.filter(gasto => gasto.id != gasto.id)
            Swal.fire(
              `${gasto.descripcion}. Eliminado con exito!`,
              'success'
            )
        })
      }
    })

  }

  gastoSeleccionadoEditar(gasto: Gasto) {
    this.gastoForm.setValue(gasto);
  }

  private alertaSweet(icon: any, title: string, text: string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }


  private inicializarVariablesFormularioGasto(): void {
    this.gastoForm = this.fb.group({
      id: null,
      descripcion:[null,Validators.required],
      valorGasto: [null,Validators.required],
      fechaCreacion: null,
      fechaGasto: null,
      ruta:[this.cartera, Validators.required]
    })
  }
  
}
