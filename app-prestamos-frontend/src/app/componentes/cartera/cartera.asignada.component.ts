import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/login/auth.service';
import { CarteraService } from '../../servicios/cartera/cartera.service';

@Component({
  selector: 'app-cartera.asignada',
  templateUrl: './cartera.asignada.component.html',
  styleUrls: ['./cartera.asignada.component.css']
})
export class CarteraAsignadaComponent implements OnInit {

  carterasAsignadas:any;

  constructor(public authService: AuthService, private carteraService: CarteraService) {
    this.carteraService.getCarterasIdNombreDescripcion(this.authService.usuario.username).subscribe(response => {
      this.carterasAsignadas = response.rutas as any[];
    })
  }

  ngOnInit(): void {
  }

}
