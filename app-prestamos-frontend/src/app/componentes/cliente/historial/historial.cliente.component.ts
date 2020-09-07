import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/entidades/cliente';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, flatMap } from 'rxjs/operators';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial.cliente',
  templateUrl: './historial.cliente.component.html',
  styleUrls: ['./historial.cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {

  historialForm: FormGroup;
  clienteForm: FormGroup;
  clientesFiltrados: Observable<Cliente[]>;
  clienteSeleccionado: Cliente;
  panelOpenState = false;
  
  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarVariablesFormularioHistorial();
    this.clientesFiltrados = this.historialForm.controls.cliente.valueChanges
    .pipe(
      map(value => value ? typeof value === 'string'? value: value.nombre: ''),
      flatMap(value => value ? value.length > 2 ? this._filter(value):[]: [])
    );
  }

  private _filter(value: string): Observable<Cliente[]> {
    const filterValue = value.toLowerCase();    
    return this.clienteService.filtrarClientesLike(filterValue);    
  }

  seleccionCliente(event: MatAutocompleteSelectedEvent):void {
    this.clienteSeleccionado = event.option.value as Cliente;
    this.clienteForm.setValue(this.clienteSeleccionado)    
  }

  mostrarNombre(cliente?:Cliente): String | undefined{
    return cliente ? cliente.entidad.nombres + ' ' + cliente.entidad.apellidos : undefined;
  }

  editarCliente(): void {
    console.log(this.clienteForm.value);    
    this.clienteService.editarCliente(this.clienteForm.value as Cliente).subscribe(clienteEdited =>{
      Swal.fire('Actualizado', 'Cliente actualizado con exito', 'success')
    })
  }

  //Inicializa las variables del formulario
  inicializarVariablesFormularioHistorial() {
    this.historialForm  =  this.formBuilder.group({
      cliente: [undefined, [Validators.required]]
    });

    this.clienteForm = this.formBuilder.group({
      id: ['',Validators.required],
      entidad: this.formBuilder.group({
        id: ['',Validators.required],
        numeroIdentificacion: ['',Validators.required],
        nombres: [null,Validators.required],
        apellidos: ['',Validators.required],
        direccion: ['',Validators.required],
        telefono: ['',Validators.required],
      }),
      enrutamiento: ['',Validators.required],
      ruta: ['',Validators.required],
      prestamos: ['',Validators.required],
      fechaCreacion: ['',Validators.required],
      activo: ['',Validators.required],
      saldoPendiente: ['',Validators.required],
    })
  }

}
