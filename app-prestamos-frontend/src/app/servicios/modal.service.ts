import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  private _notificarModificacionListaPrestamos = new EventEmitter<any>();

  constructor() { }

  cerrarModal() {
    this.modal = false;
  }

  abrirModal() {
    this.modal = true;
  }

  get notificarModificacionListaPrestamos():EventEmitter<any>{
    return this._notificarModificacionListaPrestamos;
  }
}
