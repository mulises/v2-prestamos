import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { Cliente } from 'src/app/entidades/cliente';
import { Prestamo } from 'src/app/entidades/prestamo';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CreditoService } from 'src/app/servicios/credito/credito.service';
import { Cartera } from 'src/app/entidades/cartera';
import { ActivatedRoute } from '@angular/router';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';

@Component({
  selector: 'app-form.credito',
  templateUrl: './form.credito.component.html',
  styleUrls: ['./form.credito.component.css']
})
export class FormCreditoComponent implements OnInit {

  creditoForm: FormGroup;
  clientesFiltrados: Observable<Cliente[]>;
  clienteSeleccionado: Cliente;
  nuevoCredito: Prestamo;
  creditoActivo: Prestamo;
  cartera: Cartera;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, 
  private creditoService: CreditoService,private activatedRoute: ActivatedRoute, private carteraService: CarteraService) {}

  ngOnInit() {
    this.inicializarVariablesFormularioCredito();
    let idCartera = this.activatedRoute.snapshot.paramMap.get("idCartera");
    if(idCartera) {
      this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(carteraResponse => {
        this.cartera = carteraResponse;
      });
    }

    this.clientesFiltrados = this.creditoForm.controls.cliente.valueChanges
    .pipe(
      map(value => value ? typeof value === 'string'? value: value.nombre: ''),
      flatMap(value => value ? value.length > 2 ? this._filter(value):[]: [])
    );
  }

  private _filter(value: string): Observable<Cliente[]> {
    const filterValue = value.toLowerCase();
    
    return this.clienteService.filtrarClienteLikeByRuta(filterValue,this.cartera.id);      
    
  }

  seleccionCliente(event: MatAutocompleteSelectedEvent):void {
    this.clienteSeleccionado = event.option.value as Cliente;
    this.creditoActivo = this.clienteSeleccionado.prestamos.filter(prest => prest.activo)[0];
    if(this.creditoActivo) {
      Swal.fire({
        title: `${this.creditoForm.value.cliente.entidad.nombres} ${this.creditoForm.value.cliente.entidad.apellidos} 
                tiene un prestamo activo`,
        text: "¿ Desea Continuar ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Continuar!'
      }).then((result) => {
        if (result.value) {
          //Si se continua con la ampliación el campo multa se estable como requerido
          this.creditoForm.get('multaAmpliacion').setValidators([Validators.required]);
          this.creditoForm.get('ampliacion').setValue(true);
          this.creditoForm.get('saldoAnterior').setValue(this.creditoActivo.saldoActual);
          this.creditoForm.get('multaAmpliacion').updateValueAndValidity();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.creditoForm.reset();
        }
      })
    }
  }

  generarCredito(): void {
    if(!this.clienteSeleccionado) {
      Swal.fire('Cliente no seleccionado');
      return;
    }else if((typeof this.creditoForm.value.cliente === 'string' )) {
      Swal.fire('Nombre del cliente no es el seleccionado');
      return;
    }
    this.nuevoCredito = this.creditoForm.value as Prestamo;
    this.creditoService.generarCredito(this.nuevoCredito).subscribe(prestNew => {
      Swal.fire({
        icon: 'success',
        text: `Crédito creado con éxito: ${prestNew.cliente.entidad.nombres} ${prestNew.cliente.entidad.apellidos}`
      })
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
      
    });
  }
  
  ampliarCredito(): void {
    this.nuevoCredito = this.creditoForm.value as Prestamo;
    this.creditoService.ampliarCredito(this.creditoActivo.id, this.nuevoCredito).subscribe(creditoNew =>{
      Swal.fire({
        icon: 'success',
        text: `Ampliación de credito con éxito: ${creditoNew.cliente.entidad.nombres} ${creditoNew.cliente.entidad.apellidos}`
      })
    },
    err => {
      let mensajeError = 'error no controlado: ' + err.error.message;
          if(err.error.mensajeError) {
            mensajeError = err.error.mensajeError;
          }
        
          Swal.fire({
            icon: 'error',
            title: mensajeError
          })
    })
  };

  calcularCuotas(event: any):void { }

  //Inicializa las variables del formulario
  inicializarVariablesFormularioCredito() {
    this.creditoForm  =  this.formBuilder.group({
      cliente: [undefined, [Validators.required]],
      montoPrestamo: ['', Validators.required],
      cantidadCuota: ['', Validators.required],
      multaAmpliacion: '',
      valorCuota:'',
      ampliacion:false,
      saldoAnterior: 0,
      periodicidadCobro: 1,
      valorAbono:0,
      totalPagar:0
    });
  }

  mostrarNombre(cliente?:Cliente): String | undefined{
    return cliente ? cliente.entidad.nombres + ' ' + cliente.entidad.apellidos : undefined;
  }

}
