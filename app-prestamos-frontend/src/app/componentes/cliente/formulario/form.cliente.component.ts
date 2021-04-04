import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/entidades/cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Cartera } from 'src/app/entidades/cartera';
import { CarteraService } from 'src/app/servicios/cartera/cartera.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-form.cliente',
  templateUrl: './form.cliente.component.html',
  styleUrls: ['./form.cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  clienteForm: FormGroup;
  cartera: Cartera;
  codigEmpresa: string;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute, private carteraService: CarteraService) { }
      

  ngOnInit(): void {
    this.inicializarFormularioCliente();
    this.codigEmpresa =  localStorage.getItem('codigo_empresa');
    if(this.codigEmpresa === "lanza") {
      this.clienteForm.controls.enrutamiento.setValidators(Validators.required);
      this.clienteForm.updateValueAndValidity();
    }

    
    let idCartera = this.activatedRoute.snapshot.paramMap.get("idCartera");
    if(idCartera) {
      this.carteraService.getCarteraByIdSinListCliente(+idCartera).subscribe(carteraResponse => {
        this.cartera = carteraResponse;  
        this.clienteForm.get('ruta').setValue(this.cartera);
      });
    }
    
  }

  crearCliente(): void {
    let cliente = this.clienteForm.value as Cliente;
    this.clienteService.crearCliente(cliente).subscribe(clienteCreado => {
      this.alertaSweet('success',`${clienteCreado.entidad.nombres} ${clienteCreado.entidad.apellidos}`,'Creado con éxito!');
      this.clienteForm.setValue(clienteCreado);
      console.log(this.clienteForm.value);
    });
  }

  editarCliente(): void {
    let cliente = this.clienteForm.value as Cliente;
    this.clienteService.editarCliente(cliente).subscribe(clienteEditado => {
      this.alertaSweet('success',`${clienteEditado.entidad.nombres} ${clienteEditado.entidad.apellidos}`,'Editado con éxito!');
      this.clienteForm.setValue(clienteEditado);
    });
  }

  onBlurMethod() {
    let identificacion = this.clienteForm.get('entidad').get('numeroIdentificacion').value;

    this.clienteService.getEntidadByNumeroIdentificacion(identificacion).subscribe(
      entidad => {
        if(entidad) {

          this.clienteService.getClienteByNumeroIdentificacion(entidad.numeroIdentificacion).subscribe(cliente =>{
            if(cliente!=null) {
              this.alertaSweet('error',`Usuario existe en cartera: ${cliente.ruta.nombre}`,`${cliente.entidad.nombres} ${cliente.entidad.apellidos}`);
              this.clienteForm.reset();
            }else {
              this.alertaSweet('info','Identificacíon exite en base de datos',entidad.nombres + ' ' + entidad.apellidos);
              this.clienteForm.get('entidad').setValue(entidad);
            }
          })
        }
      }
    );

    
  }

  //Metodo para inicializar el formulario
  private inicializarFormularioCliente(): void{
    this.clienteForm = this.fb.group({
      id: null,
      enrutamiento: [''],
      entidad: this.fb.group({
        id: null,
        numeroIdentificacion: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required]
      }),
      ruta: [this.cartera],
      fechaCreacion: '',
      activo:[true,Validators.required],
      prestamos: null
    });
  }

  private alertaSweet(icon: any, title: string, text: string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

}
