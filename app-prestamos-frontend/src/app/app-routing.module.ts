import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { CarteraAsignadaComponent } from './componentes/cartera/cartera.asignada.component';
import { AuthGuard } from './guards/auth.guard';
import { ListaDeudoresComponent } from './componentes/credito/lista.deudores/lista.deudores.component';
import { FormCreditoComponent } from './componentes/credito/formulario/form.credito.component';
import { FormClienteComponent } from './componentes/cliente/formulario/form.cliente.component';
import { FormGastoComponent } from './componentes/gasto/formulario/form.gasto/form.gasto.component';
import { ListaGastoComponent } from './componentes/gasto/lista/lista.gasto.component';
import { CuadreCajaComponent } from './componentes/cuadre-caja/cuadre.caja.component';
import { ValidarCuadreActivoGuard } from './guards/validar.cuadre.guard';
import { InfoFlujoCajaCarteraComponent } from './componentes/informes/flujo-caja-cartera/info.flujo.caja.cartera.component';
import { ListaPagoClienteComponent } from './componentes/pago-cliente/listar/lista.pago.cliente.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'principal', component: CarteraAsignadaComponent, canActivate:[AuthGuard], data:{role:'ROLE_LISTAR_CARTERAS'}},
  { path:'creditos/:idCartera', component: ListaDeudoresComponent, canActivate:[AuthGuard, ValidarCuadreActivoGuard], data:{role:'ROLE_LISTAR_DEUDORES'}},
  { path: 'form/credito/:idCartera', component: FormCreditoComponent, canActivate:[AuthGuard,ValidarCuadreActivoGuard]},
  { path:'cliente/:idCartera', component: FormClienteComponent, canActivate:[AuthGuard]},
  { path:'form/gasto/:idCartera', component: FormGastoComponent, canActivate:[AuthGuard,ValidarCuadreActivoGuard]},
  { path:'lista/gasto/:idCartera', component: ListaGastoComponent, canActivate:[AuthGuard]},
  { path:'form/cuadre/:idCartera', component: CuadreCajaComponent, canActivate:[AuthGuard]} ,
  { path:'form/info-flujo-caja/:idCartera', component: InfoFlujoCajaCarteraComponent, canActivate:[AuthGuard], data:{role:'ROLE_INF_FLUJO_CAJA'}},
  { path:'lista/pagos/:idCartera', component: ListaPagoClienteComponent, canActivate:[AuthGuard,ValidarCuadreActivoGuard], data:{role:'ROLE_LISTAR_PAGOS'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
