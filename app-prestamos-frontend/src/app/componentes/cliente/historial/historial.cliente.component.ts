import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/entidades/cliente';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, flatMap } from 'rxjs/operators';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-historial.cliente',
  templateUrl: './historial.cliente.component.html',
  styleUrls: ['./historial.cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {

  historialForm: FormGroup;
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
  }

  mostrarNombre(cliente?:Cliente): String | undefined{
    return cliente ? cliente.entidad.nombres + ' ' + cliente.entidad.apellidos : undefined;
  }

  //Inicializa las variables del formulario
  inicializarVariablesFormularioHistorial() {
    this.historialForm  =  this.formBuilder.group({
      cliente: [undefined, [Validators.required]]
    });
  }

}
