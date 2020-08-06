import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
registerLocaleData(localeEsCO,'es-CO')

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CarteraAsignadaComponent } from './componentes/cartera/cartera.asignada.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListaDeudoresComponent } from './componentes/credito/lista.deudores/lista.deudores.component';
import { FormCreditoComponent } from './componentes/credito/formulario/form.credito.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormClienteComponent } from './componentes/cliente/formulario/form.cliente.component';
import { FormGastoComponent } from './componentes/gasto/formulario/form.gasto/form.gasto.component';
import { ListaGastoComponent } from './componentes/gasto/lista/lista.gasto.component';
import { CuadreCajaComponent } from './componentes/cuadre-caja/cuadre.caja.component';
import { InfoFlujoCajaCarteraComponent } from './componentes/informes/flujo-caja-cartera/info.flujo.caja.cartera.component';
import { ListaPagoClienteComponent } from './componentes/pago-cliente/listar/lista.pago.cliente.component';
import { ListaCreditosComponent } from './componentes/credito/lista-creditos/lista.creditos.component';
import { HistorialClienteComponent } from './componentes/cliente/historial/historial.cliente.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarteraAsignadaComponent,
    ListaDeudoresComponent,
    FormCreditoComponent,
    HeaderComponent,
    FormClienteComponent,
    FormGastoComponent,
    ListaGastoComponent,
    CuadreCajaComponent,
    InfoFlujoCajaCarteraComponent,
    ListaPagoClienteComponent,
    ListaCreditosComponent,
    HistorialClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'es-CO' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: '$'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
