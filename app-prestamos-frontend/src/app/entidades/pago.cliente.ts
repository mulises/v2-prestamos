import { Prestamo } from './prestamo';

export class PagoCliente {
  id:number;
  valorPago:number;
  prestamo: Prestamo;
  fechaPago: Date;
}
