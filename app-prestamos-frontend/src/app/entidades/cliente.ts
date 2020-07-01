import { Entidad } from './entidad';
import { Cartera } from './cartera';
import { Prestamo } from './prestamo';

export class Cliente {
  id:number;
  entidad: Entidad;
  ruta: Cartera;
  enrutamiento: number;
  activo: boolean;
  prestamos: Prestamo[];
}
