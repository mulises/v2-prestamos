import { Cliente } from './cliente';

export class Cartera {
    id:number;
    nombre: string;
    descripcion: string;
    porcentajePrestamo: number;
    clientes:Cliente[];
}
