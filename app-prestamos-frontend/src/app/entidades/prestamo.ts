import { Cliente } from './cliente';

export class Prestamo {
  id:number;
  montoPrestamo:number;
  cantidadCuota:number;
  valorCuota:number;
  saldoActual:number;
  cliente: Cliente;
  activo:boolean;
  fechaPrestamo: Date;
  porcentajePrestamo:number;
  multaAmpliacion:number;
  ampliacion:boolean;
  saldoAnterior:number;
  valorAbono: number;
  totalPagar: number;
}
